import { useQuery } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";
import { Recording } from "../../types/getRecordingsReponse";

export const useGetRoomRecordings = (
  roomName: string,
  token: string | null,
) => {
  const { userData } = useUserData();
  const query = useQuery<Recording[]>("recordings-" + roomName, () =>
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
