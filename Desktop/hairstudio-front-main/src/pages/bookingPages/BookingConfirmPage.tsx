import BookingNav from "../../components/BookingNav"
import { useContext, useEffect } from "react";
import { BookingContext } from "../../context/bookingContext";



function BookingConfirmPage() {
  const {setStage} = useContext(BookingContext)
  
  useEffect(()=>{
    setStage(4)
  },[setStage])

  return (
    <div>
      <BookingNav title={"Confirme the reservation!"} />
    </div>
  )
}

export default BookingConfirmPage
