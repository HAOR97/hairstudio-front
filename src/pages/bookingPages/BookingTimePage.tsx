import BookingNav from "../../components/BookingNav.tsx";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/bookingContext.tsx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BookingTime from '../../components/BookingTime.tsx'
import { convertDateYYMMDD } from "../../utils/convertDateFormat.tsx";


function BookingTimePage() {
  const { setStage, id_salon ,staff } = useContext(BookingContext);
  const [selectDate,setSelectDate] = useState<null | string>(null)
  const [isLoading,setIsLoading] = useState(true)
  const [reserved,setReserved] = useState(null)

  useEffect(() => {
    setStage(3);
  });

  const handleDatePicker = async (date) => {

    const newDate = convertDateYYMMDD(date)
    setSelectDate(newDate)


    try{
      let response = await fetch(`http://127.0.0.1:8000/api/salon/barbers/booking/${id_salon}/${staff.id}/${newDate}`)

      if (!response.ok) {
        throw new Error("Network  response was not ok");
      }
      const result = await response.json()
      setReserved(result.barber[0].times.split(","))
      setIsLoading(false)
    }
    catch(error){
      console.log("error fetching data,error");
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
        {reserved && <BookingTime isLoading={isLoading} reserved={reserved} />}
      </div>

    </div>
  );
}

export default BookingTimePage;
