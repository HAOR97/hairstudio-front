import { Link, Navigate, useNavigate } from "react-router-dom";
import BookingOverview from "../../components/BookingOverview.tsx";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.tsx";
import { BookingContext } from "../../context/bookingContext.tsx";
import { CircularProgress } from "@mui/material";
import Profile from "../../components/Profile.tsx";

function BookingLayout() {
  const { ready, user, setUser } = useContext(UserContext);
  const { stage, setTime, setStaff, time, staff, service } =
    useContext(BookingContext);

  const [showProfile, setShowProfile] = useState<boolean>(false);
  const loggedIn = localStorage.getItem("isLoggedIn");
  //restet state per fazes
  const navigate = useNavigate();

  useEffect(() => {
    if (stage === 1) {
      setTime(null);
      setStaff(null);
    } else if (stage === 2) {
      setTime(null);
      if (!service) {
        navigate("/booking");
      }
    } else if (stage === 3) {
      if (!staff || !service) {
        navigate("/booking/staff");
      }
    } else if (stage === 4) {
      if (!staff || !service || !time) {
        navigate("/booking/time");
      }
    }
  }, [stage, time, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };


  return (
    <div className="flex flex-col p-7 max-w-7xl justify-center mx-auto">
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
        <h1 className="font-bold text-4xl">Booking</h1>
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
      <div className=" flex md:flex-row flex-col gap-3">
        {showProfile ? (
          user && <Profile profil={user}></Profile>
        ) : (
          <>
            <div className="flex flex-col md:w-8/12 w-full">
              <Outlet />
            </div>
            <div className="flex flex-col md:w-4/12 w-full mt-10">
              <BookingOverview />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingLayout;
