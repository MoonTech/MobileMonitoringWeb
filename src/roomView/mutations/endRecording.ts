import { useMutation, useQueryClient } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";
import { RecordRequest } from "../../types/recordRequest";

export const useEndRecording = (cameraId: string) => {
  const { userData } = useUserData();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    async () => {
      return fetch(SERVER_URL + "videoserver/record/stop", {
        method: "PUT",
        body: JSON.stringify({ cameraId: cameraId } as RecordRequest),
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res;
          throw new Error();
        })
        .then((res) => res.blob())
        .then((res) => {
          const blobUrl = URL.createObjectURL(res);

          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = "video-" + cameraId + ".flv";

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(blobUrl);
          return true;
        });
    },
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
