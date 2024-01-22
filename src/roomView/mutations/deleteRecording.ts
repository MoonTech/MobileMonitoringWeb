import { useMutation, useQueryClient } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";

export const useDeleteRecording = (roomName: string) => {
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    async (recordingName: string) =>
      fetch(SERVER_URL + "videoServer/record/" + recordingName, {
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
        console.log("deleted recording");
        queryClient.invalidateQueries({
          queryKey: ["recordings-" + roomName],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { mutateAsync };
};
