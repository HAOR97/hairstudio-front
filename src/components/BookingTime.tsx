import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../context/bookingContext";
import { CircularProgress } from "@mui/material";
import { computeFreeTermins } from "../utils/computeTermins";
import { computeTerminsToReserv } from "../utils/computeTermins";

function BookingTime({ reserved, load, shift, setShift }) {
  const { time, setTime, service } = useContext(BookingContext);
  const [filterShift,setFilterShift] = useState([{}])
  
  const handleTime = (e, t) => {
    e.preventDefault();
    setTime(computeTerminsToReserv(t,service));
  };

  useEffect(() => {
    setFilterShift(computeFreeTermins(shift, service, reserved))
  },[reserved,shift])


  return (
    <>
      <span>Select time:</span>
      <div className="grid grid-cols-3 gap-2">
        {load ? (
          <div className="pt-10 flex align-middle justify-center">
            <CircularProgress></CircularProgress>
          </div>
        ) : (
          filterShift.map((t, index) => {
            

            let active = false;
            if (time) {
              active = t.time == time.time.split(',')[0] ? true : false;
            }
            return (
              <button
                key={index}
                className={
                  active
                    ? "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 border-blue-500"
                    : "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 "
                }
                
                onClick={(e) => handleTime(e, {...t})}
              >
                {t.time}
              </button>
            );
          })
        )}
      </div>
    </>
  );
}

export default BookingTime;
