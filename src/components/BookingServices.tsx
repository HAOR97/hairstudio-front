import { useContext, useEffect } from "react";
import { BookingContext } from "../context/bookingContext";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function BookingServices() {
  const { service, setService,id_salon } = useContext(BookingContext);
  const [services,setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // type Service = {
  //   id: number;
  //   name: string;
  //   time: number;
  //   price: number;
  //   index?: number;
  // };
  // const services: Service[] = [
  //   {
  //     name: "Sisanje klasicno",
  //     time: 30,
  //     price: 1500,
  //   },
  //   {
  //     name: "Brijanje",
  //     time: 15,
  //     price: 500,
  //   },
  // ];

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/salon/provide/1`);
        if (!response.ok) {
          throw new Error("Network  response was not ok");
        }
        const result = await response.json();
        let servicesTest;
        servicesTest = result.provide;
        servicesTest.forEach((service) => {
          service.price = parseInt(service.price);
          const [hours, minutes, seconds] = service.time.split(":").map(Number);
          service.time = hours * 3600 + minutes * 60 + seconds;
        });
        setServices(servicesTest)
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching data,error");
        setIsLoading(false);
      }
    };
    fetchDate();
  }, []);

  type addServiceProp = {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    s: Service;
    index: number;
    active: boolean;
  };

  const addService = ({ e, s, index, active }: addServiceProp) => {
    e.preventDefault();

    s.index = index;

    if (!active) {
      if (service) {
        const updateService = [...service, s];
        setService(updateService);
        return;
      }
      setService([s]);
      return;
    } else {
      const updatedService = service.filter(
        (item: Service) => item.index !== index
      );
      if (updatedService.length == 0) {
        setService(null);
        return;
      }
      setService(updatedService);
    }
  };
  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        services.map((s, index) => {
          const active = service
            ? service.some((ser: Service) => ser.index === index)
            : false;

          return (
            <div
              key={index}
              className={
                active
                  ? " flex flex-row justify-between items-center  border-black-500 rounded-lg p-4 hover:bg-stone-100 cursor-pointer border-blue-500 border-2"
                  : " flex flex-row justify-between items-center border-2 border-black-500 rounded-lg p-4 hover:bg-stone-100 hover:border-stone-100 cursor-pointer "
              }
            >
              <div className="flex flex-col ">
                <div className="mb-4">
                  <h1>{s.name}</h1>
                  <span className="text-gray-400 font-light text-sm">
                    {s.time}min
                  </span>
                </div>
                <span>{s.price} din</span>
              </div>
              <button
                onClick={(e) => addService({ e, s, index, active })}
                className="bg-stone-100 text-black w-6 h-6 hover:bg-stone-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default BookingServices;
