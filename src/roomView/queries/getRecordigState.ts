import { useQuery } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";

export const useCheckCamera = (cameraId: string) => {
  const { userData } = useCache();
  const query = useQuery<boolean>(
    `check-` + cameraId,
    () =>
      fetch(SERVER_URL + "videoserver/record/check?id=" + cameraId, {
        method: "GET",
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => (res.text())).then(res => res == 'true'));

  const response = query.isLoading ? null : query.data;

  return { response };
};
