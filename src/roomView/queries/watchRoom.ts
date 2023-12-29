import { useQuery } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { WatchCamera } from "../../types/watchCamera";
import { WatchRoomRequest } from "../../types/watchRoomRequest";
import { WatchRoomResponse } from "../../types/watchRoomResponse";

export const useWatchRoom = (roomName: string) => {
  const { userData, list } = useCache();
  const roomIndex = list.findIndex((el) => el.name === roomName);
  const query = useQuery<WatchRoomResponse>(`watch-room-` + roomName, () =>
  //   fetch(SERVER_URL + "room/watch", {
  //     method: "POST",
  //     body: JSON.stringify({ roomName } as WatchRoomRequest),
  //     headers: {
  //       authorization: `Bearer ${
  //         roomIndex === -1 ? userData?.token : list[roomIndex].accessToken
  //       }`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       return { ...res } as WatchRoomResponse;
  //     }),
  // );
  {
    console.log(roomName);
    const cameras = [
      {
        id: "iasdfsad",
        acceptationState: false,
        cameraToken: "d",
        cameraName: "camera1",
        watchUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      },
      {
        id: "fdshkglkfdsg",
        acceptationState: false,
        cameraToken: "d",
        cameraName: "camera2",
        wathchUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      },
      {
        id: "gfsgsd",
        acceptationState: false,
        cameraToken: "d",
        watchUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        cameraName: "camera3"
      },
      {
        id: "fsfdgfdsg",
        acceptationState: false,
        cameraToken: "d",
        watchUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        cameraName: "camera4"
      },
      {
        id: "gfsdgdfg",
        acceptationState: false,
        cameraToken: "d",
        watchUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        cameraName: "camera5"
      },
    ] as WatchCamera[];
    const response = { connectedCameras: cameras, roomName: roomName } as WatchRoomResponse;
    return response;
  })
  return query;
};
