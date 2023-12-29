import { useMutation } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";

export const useDownloadRecording = (
  recordingName: string,
  token: string | null,
) => {
  const { userData } = useCache();

  const { mutateAsync } = useMutation(
    async () => {
      return fetch(SERVER_URL + "videoserver/record/" + recordingName, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token ?? userData?.token}`,
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
          a.download = "video-" + recordingName + ".flv";

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
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return mutateAsync;
};
