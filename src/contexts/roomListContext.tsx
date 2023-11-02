import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Room } from "../types/room";

interface RoomListContextProps {
  list: Room[];
  setList: React.Dispatch<React.SetStateAction<Room[]>>;
}

const RoomListContext = createContext<RoomListContextProps | undefined>(
  undefined,
);

export const RoomListProvider: React.FC<{ children: React.ReactNode }> = ({
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
    <RoomListContext.Provider value={{ list, setList }}>
      {children}
    </RoomListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(RoomListContext);

  if (context === undefined) {
    throw new Error("useList must be used within a ListProvider");
  }

  return context;
};
