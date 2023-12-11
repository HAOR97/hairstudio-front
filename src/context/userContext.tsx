import { ReactNode, createContext, useEffect, useState } from "react";

type User = {
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
  ready: boolean;
};

type UserContextProp = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: UserContextProp) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(true);

  

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
