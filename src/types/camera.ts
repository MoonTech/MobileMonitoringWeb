import { Room } from "./room";

export type Camera = {
  id: string;
  acceptationState: boolean;
  room: Room;
};
