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

  return { response };
};
