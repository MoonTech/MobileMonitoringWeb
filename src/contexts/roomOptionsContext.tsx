import React, { createContext, useContext, useEffect, useState } from "react";
import { WatchCamera } from "../types/watchCamera";

export type WatchState = {
  single: null | WatchCamera;
  split: WatchCamera[];
};

interface RoomOptionsContextProps {
  roomDictionary: Record<string, WatchState>;
  setRoomDictionary: React.Dispatch<
    React.SetStateAction<Record<string, WatchState>>
  >;
}

const RoomOptionsContext = createContext<RoomOptionsContextProps | undefined>(
  undefined,
);

export const RoomOptionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [roomDictionary, setRoomDictionary] = useState<
    Record<string, WatchState>
  >(() => {
    const storedDictionary = localStorage.getItem("dictionary");
    return storedDictionary ? JSON.parse(storedDictionary) : {};
  });

  useEffect(() => {
    localStorage.setItem("dictionary", JSON.stringify(roomDictionary));
  }, [roomDictionary]);

  return (
    <RoomOptionsContext.Provider value={{ roomDictionary, setRoomDictionary }}>
      {children}
    </RoomOptionsContext.Provider>
  );
};

export const useRoomOptions = () => {
  const context = useContext(RoomOptionsContext);

  if (context === undefined) {
    throw new Error("useRoomOptions must be used within a RoomContextProvider");
  }

  return context;
};
