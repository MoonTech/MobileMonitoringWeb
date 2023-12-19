import { useMutation } from "react-query";
import { useCache } from "../contexts/dataCacheContext";
import { SERVER_URL } from "../serverUrl";
import { LoginResponse } from "../types/loginResponse";
import { SignUpRequest } from "../types/signUpRequest";

export const useSignUp = () => {
  const { setUserData } = useCache();
  const { mutateAsync, isError } = useMutation<
    LoginResponse,
    unknown,
    SignUpRequest
  >(
    async (request: SignUpRequest) =>
      fetch(SERVER_URL + "user", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res;
          throw new Error();
        })
        .then((res) => res.json()),
    {
      onSuccess: ({ accessToken }, { login }) => {
        setUserData({ name: login, token: accessToken });
      },
      onError: async (error) => {
        console.log(error);
      },
    },
  );
  return { mutateAsync, isError };
};
