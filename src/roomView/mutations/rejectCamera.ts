import { useMutation } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";

export const useRejectCamera = () => {
  const { userData } = useCache();

  const { mutateAsync } = useMutation(
    async (cameraId: string) =>
      fetch(SERVER_URL + "camera/" + cameraId, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: async () => {
        console.log("Rejection successfully accepted");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return mutateAsync;
};
