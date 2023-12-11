import { useMutation } from "react-query";
import { useCache } from "../contexts/dataCacheContext";
import { SERVER_URL } from "../serverUrl";
import { PostRoomRequest } from "../types/postRoomRequest";
import { PostRoomResponse } from "../types/postRoomResponse";

export const useCreateRoom = () => {
  const { userData } = useCache();
  const { mutateAsync } = useMutation(
    async (request: PostRoomRequest) => {
      return fetch(SERVER_URL + "room", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userData?.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => (res as PostRoomResponse).roomName);
    },
    {
      onSuccess: async () => {
        console.log("creation successful");
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return mutateAsync;
};
