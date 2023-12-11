import imgLocal from "../assets/local.webp";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/bookingContext";
import { useContext, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../context/userContext";

function BookingOverview() {
  const adresa = "Skadarska 3,Belgrade";
  const services = [
    {
      name: "Sisanje klasicno",
      time: 30,
      price: 1500,
    },
  ];

  const {
    service,
    staff,
    time,
    stage,
    suma,
    loading,
    setSuma,
    date,
    id_salon,
  } = useContext(BookingContext);

  const { user } = useContext(UserContext);

  const handleClick = async () => {
    //handle just work for last step stage 4

    if (stage == 4) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/booking/create", {
            method: "POST",
            body: JSON.stringify({
              id_provide: service.map((s) => s.id).toString(), //number
              id_frizer: staff.id, //number
              id_salons: id_salon, //number
              id_user: user.id, //number
              date: date, //string
              time: time.time, //string
            }),
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Network  response was not ok");
          }
          console.log(response);
        } catch {
          console.log("error fetching data,error");
        }
      };

      fetchData();
    }
  };

  // console.log(
  //   service.map(s=>s.id).toString(),
  //   staff.id,
  //   id_salon,
  //   user.id,
  //   date,
  //   time.time)
  return (
    <div className="flex flex-col  border border-black-500 rounded-lg p-4 space-y-4 ">
      <div className="flex items-center ">
        <img
          src={imgLocal}
          loading="lazy"
          alt="local"
          className="w-16 h-16 rounded-lg"
        />
        <span className="text-sm px-3">{adresa}</span>
      </div>
      <div className="my-3">
        <p className="text-xl font-medium mb-2">Overview</p>
        {service &&
          service.map((s, index) => {
            return (
              <div key={index}>
                <div className="text-base flex justify-between space-y-1">
                  <span>{s.name}</span>
                  <span>{s.price}din</span>
                </div>
                <p className="text-gray-400 font-light text-sm">{s.time}min</p>
              </div>
            );
          })}
      </div>
      {service && (
        <>
          <div className="flex justify-between border-t text-lg font-medium">
            <span>Total</span>
            <span>{suma}din</span>
          </div>
          <div className="flex-grow"></div>
        </>
      )}
      {staff && (
        <>
          <div className="flex flex-col font-medium gap-3">
            <span className="text-xl font-medium mb-2">Appoiment</span>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-base">{staff.name} Berber</span>
            </div>
            {time && (
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                <span className="text-base">{time.time}</span>
              </div>
            )}
          </div>
          <div className="flex-grow"></div>
        </>
      )}

      <Link
        to={
          stage == 1 && !service
            ? "/booking"
            : stage == 1 && service
            ? "/booking/staff"
            : stage == 2 && !staff
            ? "/booking/staff"
            : stage == 2 && staff
            ? "/booking/time"
            : stage == 3 && !time
            ? "/booking/time"
            : stage == 3 && time
            ? "/booking/confirm"
            : window.location.pathname
        }
      >
        <button
          onClick={handleClick}
          disabled={!loading ? false : true}
          className={
            !loading
              ? "w-full justify-center items-center flex"
              : "w-full justify-center bg-zinc-600 items-center flex"
          }
        >
          {!loading ? "Continue" : <CircularProgress size={20} />}
        </button>
      </Link>
    </div>
  );
}

export default BookingOverview;
