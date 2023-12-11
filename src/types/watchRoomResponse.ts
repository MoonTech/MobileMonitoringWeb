import { WatchCamera } from "./watchCamera";

export type WatchRoomResponse = {
  roomName: string;
  connectedCameras: WatchCamera[];
};
