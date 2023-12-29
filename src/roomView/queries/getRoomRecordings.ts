import { useQuery } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { Recording } from "../../types/getRecordingsReponse";

export const useGetRoomRecordings = (
  roomName: string,
  token: string | null,
) => {
  const { userData } = useCache();
  const query = useQuery<Recording[]>(`room-recordings-` + roomName, () =>
    fetch(SERVER_URL + "room/recordings/" + roomName, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token ?? userData?.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => res.recordings)),
  );
  return query;
};
