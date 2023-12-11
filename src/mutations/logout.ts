import { useMutation } from "react-query";
import { useCache } from "../contexts/dataCacheContext";
import { SERVER_URL } from "../serverUrl";

export const useLogout = () => {
  const { userData, setUserData } = useCache();
  const { mutateAsync } = useMutation(
    async () => {
      console.log(SERVER_URL + "user/logout");
      var res = fetch(SERVER_URL + "user/logout", {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userData?.token}`,
        },
      });
      setUserData(null);
      return res;
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
