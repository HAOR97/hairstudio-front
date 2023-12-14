import { ReactNode, createContext, useState } from "react";

export type User = {
  name: string;
  surname: string;
  id:number;
  flag:string;
  phone:number;
  email: string;

};



type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  reservations: [];
  setReservations:React.Dispatch<React.SetStateAction<[]>>;
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
  const [reservations,setReservations] = useState<[]>([])

  

  return (
    <UserContext.Provider value={{ user, setUser, reservations,setReservations }}>
      {children}
    </UserContext.Provider>
  );
}
