import { useMutation } from "react-query";
import { useCache, UserData } from "../contexts/dataCacheContext";
import { SERVER_URL } from "../serverUrl";
import { LoginRequest } from "../types/loginRequest";

export const useLogin = () => {
  const { setUserData, userData } = useCache();
  const { mutateAsync } = useMutation(
    async (request: LoginRequest) => {
      return fetch(SERVER_URL + "user/login", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setUserData({ token: res.accessToken, name: request.login } as UserData)
          console.log(userData)
          return { token: res.accessToken, name: request.login } as UserData;
        });
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
