import BookingNav from "../../components/BookingNav";
import BookingServices from "../../components/BookingServices";
import { useContext, useEffect } from "react";
import { BookingContext } from "../../context/bookingContext";

function BookingServicePage() {
  
  const {stage,setStage} = useContext(BookingContext)

  useEffect(()=>{
    setStage(1)
  },[])
  
  return (
    <div>
      <BookingNav title={"Select service "}/>
      <div className="pb-5">
        <h2 className="font-bold text-2xl">Featured</h2>
      </div>
      <BookingServices />
    </div>
  );
}

export default BookingServicePage;
