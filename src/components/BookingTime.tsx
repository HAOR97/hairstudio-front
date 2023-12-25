import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../context/bookingContext";
import { CircularProgress } from "@mui/material";
import { computeFreeTermins } from "../utils/computeTermins";
import { computeTerminsToReserv } from "../utils/computeTermins";
import { Time } from "../context/bookingContext";

type BookingTimeType = {
  reserved: string[] | null;
  load: boolean;
  shift: Time[];
};

type handleTimeType = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  t: Time
) => void;

const BookingTime: React.FC<BookingTimeType> = ({ reserved, load, shift }) => {
  const { time, setTime, service } = useContext(BookingContext);
  const [filterShift, setFilterShift] = useState([{ time: "test" }]);

  const handleTime: handleTimeType = (e, t) => {
    if (!service) {
      return console.log("service je null");
    }
    e.preventDefault();
    setTime(computeTerminsToReserv(t, service));
  };

  useEffect(() => {
    //ovo if je zbog typescripta
    if (service && reserved) {
      setFilterShift(computeFreeTermins(shift, service, reserved));
    } else {
      console.log("service ili reserved je null");
    }
  }, [reserved, shift, service]);
  return (
    <>
      {load || (filterShift.length !== 0 && <span>Select time:</span>)}
      <div
        className={
          load || filterShift.length == 0
            ? "pt-10 flex align-middle justify-center"
            : "grid grid-cols-3 gap-2"
        }
      >
        {load ? (
          <CircularProgress></CircularProgress>
        ) : filterShift.length == 0 ? (
          <div className="text-xl font-bold">
            Nema slobodnih termina za ove usluge u ovom danu!
          </div>
        ) : (
          filterShift.map((t, index) => {
            let active = false;

            if (time && time) {
              active = t.time == time.time.split(",")[0] ? true : false;
            }
            return (
              <button
                key={index}
                className={
                  active
                    ? "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 border-blue-500"
                    : "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 "
                }
                onClick={(e) => handleTime(e, { ...t })}
              >
                {t.time}
              </button>
            );
          })
        )}
      </div>
    </>
  );
};

export default BookingTime;
