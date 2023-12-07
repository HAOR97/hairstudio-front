import { useContext, useEffect } from "react"
import { BookingContext } from "../context/bookingContext";
import { Link } from "react-router-dom";

function HomePage() {

  const {id_salon} = useContext(BookingContext)

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/Sisarkica/${id_salon}`, {
          method: 'POST',
          body:JSON.stringify({id_salon}),
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
          // You can pass data in the body if needed
          // body: JSON.stringify({ key: 'value' }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        // Process the response if needed
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
  
    postData();
  })
  
  return (
    <div>
      <span>Home page</span>
      <Link to={'/booking'}>
        <button>Reserved</button>
      </Link>
    </div>
  )
}

export default HomePage
