import { useMutation } from "react-query";
import { useCache } from "../contexts/roomListContext";
import { SERVER_URL } from "../serverUrl";

export const useLogout = () => {
  const { /*userData,*/ setUserData } = useCache();
  const { mutateAsync } = useMutation(
    async () => {
      console.log(SERVER_URL + "user/logout");
      // return fetch(SERVER_URL + "user/logout", {
      //   method: "DELETE",
      //   headers: {
      //     authorization: `Bearer ${userData?.token}`,
      //   },
      // });
      setUserData(null);
    },
    {
      onSuccess: async () => {
        console.log("Logout successful");
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return mutateAsync;
};
