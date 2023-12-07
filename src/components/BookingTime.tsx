import { useContext } from "react";
import { BookingContext } from "../context/bookingContext";
import { times } from "../mock/smene";
import { CircularProgress } from "@mui/material";

function BookingTime({ reserved, isloading }) {
  const { time, setTime } = useContext(BookingContext);

  const handleTime = (e, t) => {
    e.preventDefault();
    setTime(t);
  };

  return (
    <>
      <span>Select time:</span>
      <div className="grid grid-cols-3 gap-2">
        {isloading ? (
          <div className="pt-10 flex align-middle justify-center">
            <CircularProgress></CircularProgress>
          </div>
        ) : (
          times.map((t, index) => {
            if (reserved.includes(t.time)) {
              return;
            }

            let active = false;
            if (time) {
              active = t.time == time.time ? true : false;
            }
            return (
              <button
                key={index}
                className={
                  active
                    ? "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 border-blue-500"
                    : "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 "
                }
                onClick={(e) => handleTime(e, t)}
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
