import BookingTable from "../../components/BookingTable";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {  useState } from "react";
import { terminsTest } from "../../mock/barberTermins";
import dayjs from "dayjs";
import Profile from "../../components/Profile";


function HomeBarber() {
  const [active, setActive] = useState(true);
  const [termi] = useState(terminsTest);
  const [selectDate, setSelectDate] = useState(dayjs());
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Smith",
    phone: "555-5678",
    email: "jane.smith@example.com",
    years: 25,
    id: 2,
  });

  const navChange = (now: boolean) => {
    if (!now === active) {
      const changeActive = !active;
      setActive(changeActive);
    }
  };
  const handleDatePicker = (date: Date) => {
    setSelectDate(date);
  };


  return (
    <div>
      <nav>
        <ul className="p-5 flex flex-row gap-4">
          <li
            onClick={() => navChange(true)}
            className={
              active ? "cursor-pointer" : " cursor-pointer text-gray-400"
            }
          >
            Terms
          </li>
          <li
            onClick={() => navChange(false)}
            className={
              !active ? "cursor-pointer" : " cursor-pointer text-gray-400"
            }
          >
            Profile
          </li>
        </ul>
      </nav>

      <div className="p-5 max-w-7xl justify-center mx-auto gap-5">
        {active ? (
          <>
            <div className="date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={selectDate}
                    onChange={handleDatePicker}
                    disablePast={true}
                    className="w-full"
                    label="Select date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

          <BookingTable reservations={termi} show={"user"} />
            
          </>
        ) : (
          <>
            <Profile profil={profile} setProfile={setProfile} />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeBarber;
