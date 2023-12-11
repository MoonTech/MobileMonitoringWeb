import { useMutation, useQueryClient } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { RecordRequest } from "../../types/recordRequest";

export const useStartRecording = (cameraId: string) => {
  const { userData } = useCache();
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
