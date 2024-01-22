import { useQuery } from "react-query";
import { useUserData } from "../contexts/userDataContext";
import { SERVER_URL } from "../serverUrl";
import { GetMyRoomsResponse } from "../types/getMyRoomsResponse";

export const useGetMyRooms = () => {
  const { userData } = useUserData();
  const query = useQuery<GetMyRoomsResponse>(
    `myRooms`,
    () =>
      fetch(SERVER_URL + "room", {
        method: "GET",
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    { enabled: userData !== null },
  );

  return query;
};
