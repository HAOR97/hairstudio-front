import BookingNav from "../../components/BookingNav.tsx";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/bookingContext.tsx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BookingTime from "../../components/BookingTime.tsx";
import { convertDateYYMMDD } from "../../utils/convertDateFormat.tsx";
import { prva } from "../../mock/smene.tsx";
import { CircularProgress } from "@mui/material";
import {DataPickerType} from "../../utils/convertDateFormat.tsx"

function BookingTimePage() {
  const { date, setDate, setTime } = useContext(BookingContext);
  const { setStage, id_salon, staff } = useContext(BookingContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reserved, setReserved] = useState<string[] | null>(null);
  const [shift] = useState<{ time: string; }[]>(prva);


  interface response {
    time: string;
    [key: string]: string | number;
  }

  useEffect(() => {
    setStage(3);
    setTime(null)
    setDate(null)
    
  }, [setStage,setTime,setDate]);

  const handleDatePicker = async (date: DataPickerType | null) => {

    if(!date){
      return console.log("date je null")
    }
    const newDate = convertDateYYMMDD(date);
    setReserved(null);
    setDate(newDate);

    //zbog typescripta
    if(!staff){
      return console.log("staff is null");
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/salon/barbers/booking/${id_salon}/${staff.id}/${newDate}`
      );

      if (!response.ok) {
        throw new Error("Network  response was not ok");
      }

      const result = await response.json();
      const termins: string[]  = [];
      result.barber.forEach((el: response) => {
        const time = el.time.split(",").map((el) => el.trim());
        termins.push(...time);
      });
      setReserved(termins);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setReserved([]);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-5">
      <BookingNav title="Select time" />
      <div className="date">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              disablePast={true}
              views={["year", "month", "day"]}
              className="w-full"
              onChange={handleDatePicker}
              label="Select date"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        {!date ? (
          <></>
        ) : !reserved ? (
          <div className="pt-10 flex align-middle justify-center">
            <CircularProgress></CircularProgress>
          </div>
        ) : (
          <BookingTime
            shift={shift}
            load={isLoading}
            reserved={reserved}
          />
        )}
      </div>
    </div>
  );
}

export default BookingTimePage;
