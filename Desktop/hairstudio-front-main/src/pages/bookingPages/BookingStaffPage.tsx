import BookingStaffs from "../../components/BookingStaffs"
import BookingNav from "../../components/BookingNav"
import { useContext, useEffect } from "react";
import { BookingContext } from "../../context/bookingContext";

function BookingStaffPage() {
  const {setStage} = useContext(BookingContext)
  
  useEffect(()=>{
    setStage(2)
  },[setStage])

  return (
    <div>

      <BookingNav title={"Select barber"} />
      <BookingStaffs /> 
    </div>
  )
}

export default BookingStaffPage
