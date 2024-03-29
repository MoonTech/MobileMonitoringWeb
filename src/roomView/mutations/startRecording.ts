import { useMutation, useQueryClient } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";
import { RecordRequest } from "../../types/recordRequest";

export const useStartRecording = (cameraId: string) => {
  const { userData } = useUserData();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    async () =>
      fetch(SERVER_URL + "videoserver/record/start", {
        method: "PUT",
        body: JSON.stringify({ cameraId: cameraId } as RecordRequest),
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) return res;
        throw new Error();
      }),
    {
      onSuccess: async () => {
        console.log("recording successfully accepted");
        queryClient.invalidateQueries({ queryKey: ["check-" + cameraId] });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return mutateAsync;
};
