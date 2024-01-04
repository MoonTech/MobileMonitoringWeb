import { useMutation, useQueryClient } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";

export const useDeleteRecording = (roomName: string) => {
  const { userData } = useCache();
  const queryClient = useQueryClient();
  const { mutateAsync, isError } = useMutation(
    async () =>
      fetch(SERVER_URL + "videoServer/record/" + roomName, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userData?.token}`,
        },
      }).then((res) => {
        if (res.ok) return true;
        throw new Error();
      }),
    {
      onSuccess: async () => {
        console.log("deleted recording");
        queryClient.invalidateQueries({
          queryKey: ["room-recordings-" + roomName],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { mutateAsync, isError };
};
