import { useMutation } from "react-query";
import { SERVER_URL } from "../serverUrl";
import { PostRoomRequest } from "../types/postRoomRequest";
import { PostRoomResponse } from "../types/postRoomResponse";

export const useCreateRoom = () => {
  const { mutateAsync } = useMutation(
    async (request: PostRoomRequest) => {
      return fetch(SERVER_URL + "room", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => res.json())
        .then(res => (res as PostRoomResponse).accessToken)
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
