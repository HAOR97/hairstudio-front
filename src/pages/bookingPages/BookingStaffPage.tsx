import BookingStaffs from "../../components/BookingStaffs"
import BookingNav from "../../components/BookingNav"
import { useContext, useEffect } from "react";
import { BookingContext } from "../../context/bookingContext";

function BookingStaffPage() {
  const {stage,setStage} = useContext(BookingContext)
  
  useEffect(()=>{
    setStage(2)
  },[])

  return (
    <div>

      <BookingNav title={"Select barber"} />
      <BookingStaffs /> 
    </div>
  )
}

export default BookingStaffPage
