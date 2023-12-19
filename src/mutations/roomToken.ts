import { useMutation } from "react-query";
import { SERVER_URL } from "../serverUrl";
import { PostRoomTokenRequest } from "../types/postRoomTokenRequest";
import { PostRoomTokenResponse } from "../types/postRoomTokenResponse";

export const useRoomToken = () => {
  const { mutateAsync, isError } = useMutation<
    string,
    unknown,
    PostRoomTokenRequest
  >(
    async (request) =>
      fetch(SERVER_URL + "room/token", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res;
          throw new Error();
        })
        .then((res) => res.json())
        .then((res) => (res as PostRoomTokenResponse).accessToken),
    {
      onSuccess: async () => {
        console.log("token successful");
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return { mutateAsync, isError };
};
