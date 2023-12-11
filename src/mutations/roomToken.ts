import { useMutation } from "react-query";
import { SERVER_URL } from "../serverUrl";
import { PostRoomTokenRequest } from "../types/postRoomTokenRequest";
import { PostRoomTokenResponse } from "../types/postRoomTokenResponse";

export const useRoomToken = () => {
  const { mutateAsync } = useMutation(
    async (request: PostRoomTokenRequest) => {
      return fetch(SERVER_URL + "room/token", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => (res as PostRoomTokenResponse).accessToken);
    },
    {
      onSuccess: async () => {
        console.log("token successful");
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return mutateAsync;
};
