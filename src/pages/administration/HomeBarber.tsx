import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.tsx";
import Profile from "../../components/Profile.tsx";
import BookingTable from "../../components/BookingTable.tsx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { convertDateYYMMDD } from "../../utils/convertDateFormat.tsx";
import { terminsTest } from "../../mock/barberTermins";
import { DataPickerType } from "../../utils/convertDateFormat.tsx";
import { CircularProgress, fabClasses } from "@mui/material";

function HomeBarber() {
  const { user, setUser, reservations } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [termi] = useState(terminsTest);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/administration");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin-info");
    localStorage.removeItem("isLoggedInAdmin");
    setUser(null);
  };

  const handleDatePicker = async (date: DataPickerType | null) => {
    if (!date) {
      return console.log("date je null");
    }
    const newDate = convertDateYYMMDD(date);
    setSelectDate(newDate);
    console.log(newDate);

    try {
      const respond = await fetch(
        `http://127.0.0.1:8000/api/BerbersPanel/${newDate}/${user?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!respond.ok) {
        throw new Error();
      }
      const result = await respond.json();
      console.log(result);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col p-7 max-w-7xl justify-center mx-auto">
      <div className="">
        <div className="flex flex-row w-full justify-between mb-7">
          <div
            className={
              showProfile
                ? " p-2 cursor-pointer mb-3 w-max rounded-md bg-stone-100"
                : " cursor-pointer mb-3 w-max rounded-md p-2 hover:bg-stone-100"
            }
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <h1 className="font-bold text-4xl">Welcome {user?.name}</h1>
          <div
            className=" p-2 cursor-pointer mb-3 w-max rounded-md hover:bg-stone-100"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
        <div></div>
        {showProfile ? (
          user && (
            <div className=" flex flex-col ">
              <Profile profil={user}></Profile>
            </div>
          )
        ) : (
          <>
            <div className="date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    //value={selectDate}
                    onChange={handleDatePicker}
                    disablePast={true}
                    className="w-full"
                    label="Select date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            {!selectDate ? (
              <></>
            ) : isLoading ? (
              <div className="flex justify-center items-center pt-10">
                <CircularProgress />
              </div>
            ) : (
              <BookingTable reservations={termi} show={"user"} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomeBarber;
