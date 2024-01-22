import { useQuery } from "react-query";
import { useList } from "../../contexts/listDataContext";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";
import { WatchRoomRequest } from "../../types/watchRoomRequest";
import { WatchRoomResponse } from "../../types/watchRoomResponse";

export const useWatchRoom = (roomName: string) => {
  const { userData } = useUserData();
  const { list } = useList();
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
        return { ...res } as WatchRoomResponse;
      }),
  );
  return query;
};
