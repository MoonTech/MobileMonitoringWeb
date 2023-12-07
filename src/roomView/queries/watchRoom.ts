import { Camera } from "../../types/camera";

export const useWatchRoom = (roomName: string) => {
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
      name: "camera1"
    },
    {
      id: "fdshkglkfdsg",
      acceptationState: false,
      name: "camera2"
    },
    {
      id: "gfsgsd",
      acceptationState: false,
      name: "camera3"
    },
    {
      id: "fsfdgfdsg",
      acceptationState: false,
      name: "camera4"
    },
    {
      id: "gfsdgdfg",
      acceptationState: false,
      name: "camera5"
    },
  ] as Camera[];
  return { response };
};
