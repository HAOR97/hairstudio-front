import { useContext, useEffect } from "react";
import { BookingContext } from "../context/bookingContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { id_salon } = useContext(BookingContext);


  return (
    <div>
      <span>Home page</span>
      <Link to={"/booking"}>
        <button>Reserved</button>
      </Link>
    </div>
  );
}

export default HomePage;
