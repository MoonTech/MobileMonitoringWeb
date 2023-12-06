import { useMutation } from "react-query";
// import { useCache } from "../../contexts/roomListContext";
// import { SERVER_URL } from "../../serverUrl";

export const useAcceptCamera = () => {
  // const { userData } = useCache();

  const { mutateAsync } = useMutation(
    async (cameraId: string) => {
      console.log(cameraId);
    },
    // fetch(SERVER_URL + "camera/" + cameraId, {
    //   method: "PUT",
    //   headers: {
    //     authorization: `Bearer ${userData?.token}`,
    //     "Content-Type": "application/json",
    //   },
    // }),
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
