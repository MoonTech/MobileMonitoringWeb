import { useMutation, useQueryClient } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { RecordRequest } from "../../types/recordRequest";

export const useEndRecording = (cameraId: string) => {
  const { userData } = useCache();
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(
    async () => {
      return fetch(SERVER_URL + "videoserver/record/stop", {
        method: "PUT",
        body: JSON.stringify({ cameraId: cameraId } as RecordRequest),
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then(res => res.blob()).then(res => {
        const blobUrl = URL.createObjectURL(res);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'video-' + cameraId + '.flv'; // Set the desired file name

        // Append the anchor to the body and click it
        document.body.appendChild(a);
        a.click();

        // Remove the anchor from the body
        document.body.removeChild(a);

        // Revoke the blob URL to free up resources
        URL.revokeObjectURL(blobUrl);
        return true;
      })
    },
    {
      onSuccess: async () => {
        console.log("recording successfully accepted");
        queryClient.invalidateQueries({ queryKey: ['check-' + cameraId] })
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return mutateAsync;
};

