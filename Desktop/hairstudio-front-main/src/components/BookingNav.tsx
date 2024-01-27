import { Link } from "react-router-dom";
import { BookingContext } from "../context/bookingContext";
import { useContext } from "react";

type BookingNavProp = {
  title:string;
}

function BookingNav({title}: BookingNavProp) {
  
  const {stage} = useContext(BookingContext)


  return (
    <div className="flex flex-col space-y-3 mb-8 mt-4">
      <div className="flex">
        <Link to={"/booking"} >Services</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <Link to={"/booking/staff"} className={ stage >=2 ? "":" pointer-events-none text-gray-400"}>Team</Link>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <Link to={"/booking/time"} className={ stage >=3 ? "":" pointer-events-none text-gray-400"}>Time</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <Link to={"/booking/confirm"} className={ stage >=4 ? "":" pointer-events-none text-gray-400"}>Confirm</Link>
      </div>

      <h1 className="font-bold text-4xl">{title}</h1>
    </div>
  );
}

export default BookingNav;
