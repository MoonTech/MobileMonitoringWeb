import { useQuery } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { WatchRoomRequest } from "../../types/watchRoomRequest";
// import { WatchCamera } from "../../types/watchCamera";
import { WatchRoomResponse } from "../../types/watchRoomResponse";

export const useWatchRoom = (roomName: string) => {
  const { userData, list } = useCache();
  const roomIndex = list.findIndex((el) => el.name === roomName);
  const query = useQuery<WatchRoomResponse>(`watch-room-` + roomName, () =>
    fetch(SERVER_URL + "room/watch", {
      method: "POST",
      body: JSON.stringify({ roomName } as WatchRoomRequest),
      headers: {
        authorization: `Bearer ${
          roomIndex === -1 ? userData?.token : list[roomIndex].accessToken
        }`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return { ...res } as WatchRoomResponse;
      }),
  );
  // console.log(roomName);
  // const cameras = [
  //   {
  //     id: "iasdfsad",
  //     acceptationState: false,
  //     name: "camera1",
  //     url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  //   },
  //   {
  //     id: "fdshkglkfdsg",
  //     acceptationState: false,
  //     name: "camera2",
  //     url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  //   },
  //   {
  //     id: "gfsgsd",
  //     acceptationState: false,
  //     url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  //     name: "camera3"
  //   },
  //   {
  //     id: "fsfdgfdsg",
  //     acceptationState: false,
  //     url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  //     name: "camera4"
  //   },
  //   {
  //     id: "gfsdgdfg",
  //     acceptationState: false,
  //     url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  //     name: "camera5"
  //   },
  // ] as WatchCamera[];
  // const response = { connectedCameras: cameras, roomName: roomName } as WatchRoomResponse;
  return query;
};
