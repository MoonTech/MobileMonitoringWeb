import { useMutation, useQueryClient } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";
import { PostRoomRequest } from "../../types/postRoomRequest";
import { PostRoomResponse } from "../../types/postRoomResponse";

export const useCreateRoom = () => {
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const { mutateAsync, isError } = useMutation<
    PostRoomResponse,
    unknown,
    PostRoomRequest
  >(
    async (request: PostRoomRequest) =>
      fetch(SERVER_URL + "room", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userData?.token}`,
        },
      })
        .then((res) => {
          if (res.ok) return res;
          throw new Error();
        })
        .then((res) => res.json()),
    {
      onSuccess: async () => {
        console.log("creation successful");
        queryClient.invalidateQueries({
          queryKey: ["myRooms"],
        });
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return { mutateAsync, isError };
};
