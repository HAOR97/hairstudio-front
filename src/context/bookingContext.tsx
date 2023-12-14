import { ReactNode, createContext, useEffect, useState } from "react";

export type Servic = {
  index: number;
  id:number;
  name: string;
  time: number;
  price: number;
}

export type Service = Servic[];

export type Staff = {
  index:number;
  name: string;
  id:string;
};

export type Time = {
  time: string;
};

type BookingContextProp = {
  children: ReactNode;
};
type BookingContextType = {
  id_salon : number;
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
};

const initialBookingContext: BookingContextType = {
  id_salon: 0, 
  service: null,
  setService: () => {},
  staff: null,
  setStaff: () => {},
  time: null,
  setTime: () => {},
  date: null,
  setDate: () => {},
  stage: 0,
  setStage: () => {},
  suma: 0,
  setSuma: () => {},
  loading: false,
  setLoading: () => {},
};

export const BookingContext = createContext<BookingContextType >(initialBookingContext);

export function BookingContextProvider({ children }: BookingContextProp) {
  const id_salon: number = 1;
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
        id_salon,
        setDate,
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
