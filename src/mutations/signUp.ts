import { useMutation } from "react-query";
import { useCache, UserData } from "../contexts/dataCacheContext";
import { SERVER_URL } from "../serverUrl";
import { SignUpRequest } from "../types/signUpRequest";

export const useSignUp = () => {
  const { setUserData } = useCache();
  const { mutateAsync } = useMutation(
    async (request: SignUpRequest) => {
      return fetch(SERVER_URL + "user", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => res.json())
        .then(res => {
          setUserData({ token: res.accessToken, name: request.login } as UserData)
          return true;
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
