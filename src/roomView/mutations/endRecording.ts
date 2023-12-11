import { useMutation } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";
import { RecordRequest } from "../../types/recordRequest";

export const useEndRecording = () => {
  const { userData } = useCache();

  const { mutateAsync } = useMutation(
    async (request: RecordRequest) => {
      return fetch(SERVER_URL + "videoserver/record/stop", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.blob());
    }
  );

  return mutateAsync;
};

