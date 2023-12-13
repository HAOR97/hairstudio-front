import BookingNav from "../../components/BookingNav.tsx";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/bookingContext.tsx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BookingTime from '../../components/BookingTime.tsx'
import { convertDateYYMMDD } from "../../utils/convertDateFormat.tsx";
import { prva,druga } from "../../mock/smene.tsx";

function BookingTimePage() {
  const {setDate,setTime} = useContext(BookingContext)
  const { setStage, id_salon ,staff } = useContext(BookingContext);
  const [isLoading,setIsLoading] = useState(true)
  const [reserved,setReserved] = useState(null)
  const [shift,setShift] = useState(prva)

  useEffect(() => {
    setStage(3);
    setTime(null)
  },[]);

  const handleDatePicker = async (date) => {

    const newDate = convertDateYYMMDD(date)
    setReserved(null)
    setDate(newDate)
    try{
      let response = await fetch(`http://127.0.0.1:8000/api/salon/barbers/booking/${id_salon}/${staff.id}/${newDate}`)

      if(!response.ok){
        throw new Error("Network  response was not ok");
      }

      const result = await response.json()
      const termins = [];
      result.barber.forEach(el => {
          const time = el.time.split(',').map(el=> el.trim())
          termins.push(...time)
      })
      setReserved(termins)
      setIsLoading(false)
    }
    catch(error){
      console.log(error);
      setReserved([])
      setIsLoading(false)
    }
    
  }
  return (
    <div className="space-y-5">
      <BookingNav title="Select time" />
      <div className="date">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer  components={["DatePicker"]}>
            <DatePicker disablePast={true} views={['year', 'month', 'day']} className="w-full" onChange={handleDatePicker} label="Select date" />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        {reserved && <BookingTime shift={shift} setShift={setShift}  isLoading={isLoading} reserved={reserved} />}
      </div>

    </div>
  );
}

export default BookingTimePage;
