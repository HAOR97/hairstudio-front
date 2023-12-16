import { ReactNode, createContext, useState } from "react";

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

  

  return (
    <UserContext.Provider value={{ user, setUser, reservations,setReservations }}>
      {children}
    </UserContext.Provider>
  );
}
