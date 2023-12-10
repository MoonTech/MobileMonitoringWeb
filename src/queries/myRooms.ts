import { useQuery } from "react-query";
import { useCache } from "../contexts/dataCacheContext";
import { SERVER_URL } from "../serverUrl";
import { GetMyRoomsResponse } from "../types/getMyRoomsResponse";

export const useGetMyRooms = () => {
  const { userData } = useCache();
  const query = useQuery<GetMyRoomsResponse>(
    `myRooms`,
    () =>
      fetch(SERVER_URL + "room", {
        method: "GET",
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => (res.json())).then(res => res as GetMyRoomsResponse))

  return query;
};
