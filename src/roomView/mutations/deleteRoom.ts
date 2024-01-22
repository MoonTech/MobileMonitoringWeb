import { useMutation, useQueryClient } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";

export const useDeleteRoom = (roomName: string) => {
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const { mutateAsync, isError } = useMutation(
    async () =>
      fetch(SERVER_URL + "room/" + roomName, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) return true;
        throw new Error();
      }),
    {
      onSuccess: async () => {
        console.log("deleted room");
        queryClient.invalidateQueries({
          queryKey: ["myRooms"],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { mutateAsync, isError };
};
