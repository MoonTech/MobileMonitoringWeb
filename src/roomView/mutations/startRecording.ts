import { useMutation } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { RecordRequest } from "../../types/recordRequest";

export const useStartRecording = () => {
  const { userData } = useCache();

  const { mutateAsync } = useMutation(
    async (request: RecordRequest) =>
      fetch(SERVER_URL + "videoserver/record/start", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }),
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

