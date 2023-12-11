import { useQuery } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { Camera } from "../../types/camera";

export const useGetCameraToAccept = (roomName: string) => {
  const { userData } = useCache();
  const query = useQuery<Camera[]>(`room-cameras-accept-` + roomName, () =>
    fetch(SERVER_URL + "room/" + roomName, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userData?.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => res.pendingCameras)),
  );

  const response = query.isLoading ? null : query.data;

  // const response = [
  //   {
  //     name: "camera1",
  //     id: "213rewqfdsa",
  //     cameraToken: "fsafd23",
  //     acceptationState: false
  //   },
  //   {
  //     name: "camera2",
  //     id: "213rewqf2sa",
  //     cameraToken: "fsafd23",
  //     acceptationState: false
  //   },
  //   {
  //     name: "camera3",
  //     id: "213rewqf3sa",
  //     cameraToken: "fsafd23",
  //     acceptationState: false
  //   },
  // ] as Camera[];

  return { response };
};
