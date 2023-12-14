export interface DataPickerType {
    $D: number;
    $H: number;
    $L: string;
    $M: number;
    $W: number;
    $d: Date;
    $m: number;
    $y: number;
  }
export const convertDateYYMMDD = (date: DataPickerType) => {
console.log(date)
    const mm = date.$M + 1;
  const mon = mm < 10 ? `0${mm}` : `${mm}`;
  const day = date.$D < 10 ? `0${date.$D}` : `${date.$D}`;
  const newDate = `${date.$y}-${mon}-${day}`;

  return newDate;
};

export function startEndTime(timeString: string): string {
    const times: string[] = timeString.split(',');
    if (times.length === 1) {
        return `${times[0]} - ${add15Minutes(times[0])}`;
    }

    const startTime: string = times[0];
    const endTime: string = add15Minutes(times[times.length - 1]);

    return `${startTime} - ${endTime}`;

    function add15Minutes(time: string): string {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + 15;

        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;

        // Use the ternary operator to conditionally add leading zero
        const formattedHours = newHours < 10 ? '0' + newHours.toString() : newHours.toString();

        return `${formattedHours}:${newMinutes.toString().padStart(2, '0')}`;
    }
}