import { useMutation } from "react-query";
import { useCache, UserData } from "../contexts/roomListContext";
import { SERVER_URL } from "../serverUrl";
import { LoginRequest } from "../types/loginRequest";

export const useLogin = () => {
  const { setUserData } = useCache();
  const { mutateAsync } = useMutation(
    async (request: LoginRequest) => {
      // return fetch(SERVER_URL + "user/login", {
      //   method: "POST",
      //   body: JSON.stringify(request),
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      // })
      // .then(res => res.json())
      // .then(res => {
      //   setUserData({ token: res.accessToken, name: request.login } as UserData)
      // });
      setUserData({ token: "essatoken", name: request.login } as UserData);
      return true;
    },
    {
      onSuccess: async () => {
        console.log("Login successful");
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return mutateAsync;
};
