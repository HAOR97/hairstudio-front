export const computeFreeTermins = (smene, service, reserved) => {
  const slobodniTermini = [];
  //const krugova = 1; // 45 min
  const totalTimeOfService = service.reduce(
    (accomulator, currentValue) => accomulator + currentValue.time,
    0
  );
  const krugova = (totalTimeOfService - 15) / 15;
  smene = smene.filter((t) => !reserved.includes(t.time));

  for (let i = 0; i < smene.length - krugova; i++) {
    let odgovara = true;

    for (let n = 0; n < krugova; n++) {
      if (!isExactly15MinutesLater(smene[i + n].time, smene[i + n + 1].time)) {
        odgovara = false;
        break; // Break out of the inner loop as soon as non-consecutive pair is found
      }
    }

    if (odgovara) {
      slobodniTermini.push(smene[i]);
    }
  }

  return slobodniTermini;

  function isExactly15MinutesLater(currentTime: string, nextTime: string) {
    const currentMinutes = convertToMinutes(currentTime);
    const nextMinutes = convertToMinutes(nextTime);

    return nextMinutes - currentMinutes === 15;
  }

  // Function to convert time strings to minutes since midnight
  function convertToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }
};

export const computeTerminsToReserv = (time, service) => {
  const totalTimeOfService = service.reduce(
    (accomulator, currentValue) => accomulator + currentValue.time,
    0
  );
  const krugova = (totalTimeOfService - 15) / 15;

  let timeInMin = convertToMinutes(time.time);

  let nizTime = time

  for(let i=0 ; i< krugova;i++){
    timeInMin = timeInMin + 15
    nizTime.time += `,${convertToTime(timeInMin)}` 
  }

  return nizTime;

  function convertToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function convertToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours === 0 ? "12" : String(hours); // Handle midnight as 12
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }
};
