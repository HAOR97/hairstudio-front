import { ReactNode, createContext, useEffect, useState } from "react";
import { fetchReservationsType } from "../types/fetchs";

export type User = {
  name: string;
  surname: string;
  id:number;
  flag:string;
  phone:number;
  email: string;

};

export type Reservations = {
  id:number;
  id_salons:number;
  id_user: number;
  id_frizer: number;
  name_frizOrUser: string;
  date:string;
  time:string;
}


type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  reservations: Reservations[] | null;
  setReservations:React.Dispatch<React.SetStateAction<Reservations[] | null>>;
};

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},

  reservations: [],
  setReservations: () => [],
};


type UserContextProp = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType >(initialUserContext);

export function UserContextProvider({ children }: UserContextProp) {
  const [user, setUser] = useState<User | null>(null);
  const [reservations,setReservations] = useState<Reservations[] | null>(null)

  useEffect(()=>{
    if(!user){
      return
    }
    const fetchReservations = async()=>{
      try{
        const respond = await fetch(`http://127.0.0.1:8000/api/booking/read/${user?.flag}/${user?.id}`)
        if (!respond.ok) {
          throw new Error();
        }
        const result = await respond.json()
        const allReservations = result.$bookingUser.map((b: fetchReservationsType)=>{
          return({
            id: parseInt(b.id_provide),
            id_salons: 1,
            id_user: b.id_user, 
            id_frizer: b.id_frizer,
            date: b.date,
            time: b.time,
            name_frizOrUser: `${b.barbers_table.name} ${b.barbers_table.surname}`,
          })
        })
        setReservations(allReservations)
      }
      catch(err){
        console.log(err)
        setReservations(null)
      }
    }
    fetchReservations()
  },[user])  
  return (
    <UserContext.Provider value={{ user, setUser, reservations,setReservations }}>
      {children}
    </UserContext.Provider>
  );
}
