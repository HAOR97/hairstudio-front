import { ReactNode, createContext, useEffect, useState } from "react";
import { fetchReservationsUserType } from "../types/fetchs";
import { UserType } from "../pages/bookingPages/RegisterPage";

export type User = {
  name: string;
  surname: string;
  id: number;
  flag: string;
  phone: number;
  email: string;
};

// export type BarberType = {
//   id: number;
//   name: string;
//   surname: string;
//   flag: string;
//   email: string;
//   phone: string;
//   smena: string;
//   email_verified_at: null | string; // Assuming email_verified_at can be null or a string
//   created_at: null | string; // Assuming created_at can be null or a string
//   updated_at: null | string; // Assuming updated_at can be null or a string
//   id_salon: number;
// };

export type Reservations = {
  id: number;
  id_salons: number;
  id_user: number;
  id_frizer: number;
  name_frizOrUser: string;
  date: string;
  time: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  reservations: Reservations[] | null;
  setReservations: React.Dispatch<React.SetStateAction<Reservations[] | null>>;
  barbers: UserType[] | null;
  setBarbers: React.Dispatch<React.SetStateAction<UserType[] | null>>;
};

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},

  reservations: [],
  setReservations: () => [],

  barbers: null,
  setBarbers: () => {},
};

type UserContextProp = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>(initialUserContext);

export function UserContextProvider({ children }: UserContextProp) {
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservations[] | null>(null);
  const [barbers, setBarbers] = useState<UserType[] | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchReservations = async () => {
      try {
        const respond = await fetch(
          `http://127.0.0.1:8000/api/booking/read/${user?.flag}/${user?.id}`
        );
        const result = await respond.json();
        if('$bookingUser' in result){          
          const allReservations = result.$bookingUser.map(
            (b: fetchReservationsUserType) => {
              return {
                //ovo nije dobrooo prvo id
                id: b.id,
                id_salons: 1,
                id_user: b.id_user,
                id_frizer: b.id_frizer,
                date: b.date,
                time: b.time,
                name_frizOrUser: b.barbers_table ? `${b.barbers_table.name} ${b.barbers_table.surname}` : "frizer ne radi vise",
              };
            }
            );

            setReservations(allReservations);
          }

      } catch (err) {
        console.log(err);
        //setReservations(null);
      }
    };

    const fetchBarbers = async () => {
      try {
        const respond = await fetch(`http://127.0.0.1:8000/api/AdminPanel`);
        if (!respond.ok) {
          throw new Error();
        }
        const result = await respond.json();
        setBarbers(result.barber);
        
      } catch (err) {
        console.log(err);
      }
    };

    if (user.flag == "user") {
      fetchReservations();
    } else if (user.flag == "admin") {
      fetchBarbers();
    }

  }, [user]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        reservations,
        setReservations,
        barbers,
        setBarbers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
