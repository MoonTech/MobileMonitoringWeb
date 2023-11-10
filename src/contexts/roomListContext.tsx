import React, { createContext, useContext, useEffect, useState } from "react";
import { Room } from "../types/room";

export type UserData = {
  name: string;
  token: string;
};

interface DataCacheContextProps {
  list: Room[];
  setList: React.Dispatch<React.SetStateAction<Room[]>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const DataCacheContext = createContext<DataCacheContextProps | undefined>(
  undefined,
);

export const DataCacheProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [list, setList] = useState<Room[]>(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });

  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [list, userData]);

  return (
    <DataCacheContext.Provider value={{ list, setList, userData, setUserData }}>
      {children}
    </DataCacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(DataCacheContext);

  if (context === undefined) {
    throw new Error("useCache must be used within a DataCacheProvider");
  }

  return context;
};
