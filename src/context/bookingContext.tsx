import React, { ReactNode, createContext, useEffect, useState } from "react";

type Service = {
  index: number;
  name: string;
  time: number;
  price: number;
}[];

type Staff = {
  index:number;
  name: string;
};

type Time = {
  time: string;
};

type BookingContextType = {
  service: Service | null;
  setService: React.Dispatch<React.SetStateAction<Service | null>>;
  staff: Staff | null;
  setStaff: React.Dispatch<React.SetStateAction<Staff | null>>;
  time: Time | null;
  setTime: React.Dispatch<React.SetStateAction<Time | null>>;
  date: string | null;
  setDate: React.Dispatch<React.SetStateAction<string | null>>;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  suma: number;
  setSuma: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  id_salona : string
};

type BookingContextProp = {
  children: ReactNode;
};

export const BookingContext = createContext<BookingContextType | null>(null);

export function BookingContextProvider({ children }: BookingContextProp) {
  const id_salon: number | null = 1;
  const [service, setService] = useState<Service | null>(null);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [stage, setStage] = useState<number>(1);
  const [suma, setSuma] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (service) {
      const totalSuma = service.reduce((acc, s) => acc + s.price, 0);
      setSuma(totalSuma);
    } else {
      setSuma(0);
    }
  }, [service]);

  return (
    <BookingContext.Provider
      value={{
        date,
        setDate,
        id_salon,
        service,
        setService,
        staff,
        setStaff,
        time,
        setTime,
        stage,
        setStage,
        suma,
        setSuma,
        loading,
        setLoading
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
