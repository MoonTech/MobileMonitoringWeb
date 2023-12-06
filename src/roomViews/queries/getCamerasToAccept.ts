// import { useQuery } from "react-query";
// import { useCache } from "../../contexts/roomListContext"
// import { SERVER_URL } from "../../serverUrl";
import { Camera } from "../../types/camera";

export const useCameraToAccept = (roomName: string) => {
  // const { userData } = useCache();
  // const query = useQuery<Camera[]>(
  //   `room-` + roomName,
  //   () =>
  //     fetch(SERVER_URL + "room/" + roomName, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${userData?.token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }).then((res) => res.json())
  // );
  // const response = query.isLoading ? null : query.data;
  console.log(roomName);
  const response = [
    {
      id: "iasdfsad",
      acceptationState: false,
      room: {
        cameras: [],
        name: "dasf",
        owner: { rooms: [], login: "dfasfas" },
      },
    },
  ] as Camera[];
  return { response };
};
