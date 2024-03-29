import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../context/bookingContext";
import { CircularProgress } from "@mui/material";
import { Staff } from "../context/bookingContext";

function BookingStaffs() {
  const { staff, setStaff, id_salon } = useContext(BookingContext);
  const [staffs, setStaffs] = useState<null | Staff[]>(null);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/salon/barbers/${id_salon}`
        );
        if (!response.ok) {
          throw new Error("Network  response was not ok");
        }
        const result = await response.json();
        setStaffs(result.barber);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDate();
  }, [id_salon]);

  type handelStaffType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    s: Staff,
    index: number,
  ) => void;

  const handleStaff:handelStaffType = (e, s, index) => {
    e.preventDefault();
    setStaff({ ...s, index: index });
  };
  return (
    <div>
      {!staffs ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {staffs.map((s, index) => {
            const active = staff ? staff.index === index : false;

            return (
              <button
                key={index}
                className={
                  active
                    ? "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 border-blue-500"
                    : "border-2 border-black-500 rounded-lg bg-white text-black hover:bg-stone-100 "
                }
                onClick={(e) => handleStaff(e, s, index)}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingStaffs;
