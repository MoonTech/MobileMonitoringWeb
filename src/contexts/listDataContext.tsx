import React, { createContext, useContext, useEffect, useState } from "react";
import { Room } from "../types/room";

interface ListDataContextProps {
  list: Room[];
  setList: React.Dispatch<React.SetStateAction<Room[]>>;
}

const ListDataContext = createContext<ListDataContextProps | undefined>(
  undefined,
);

export const ListDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [list, setList] = useState<Room[]>(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <ListDataContext.Provider value={{ list, setList }}>
      {children}
    </ListDataContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListDataContext);

  if (context === undefined) {
    throw new Error("useList must be used within a ListDataProvider");
  }

  return context;
};
