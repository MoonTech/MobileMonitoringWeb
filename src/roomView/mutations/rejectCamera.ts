import { useMutation, useQueryClient } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";

export const useRejectCamera = (roomName: string) => {
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    async (cameraId: string) =>
      fetch(SERVER_URL + "camera/" + cameraId, {
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
        console.log("Rejection successfully accepted");
        queryClient.invalidateQueries({
          queryKey: ["room-cameras-accept-" + roomName],
        });
        queryClient.invalidateQueries({ queryKey: ["watch-room-" + roomName] });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return mutateAsync;
};
