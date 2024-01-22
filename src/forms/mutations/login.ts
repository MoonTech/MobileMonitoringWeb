import { useMutation } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";
import { LoginRequest } from "../../types/loginRequest";
import { LoginResponse } from "../../types/loginResponse";

export const useLogin = () => {
  const { setUserData } = useUserData();
  const { mutateAsync, isError } = useMutation<
    LoginResponse,
    unknown,
    LoginRequest
  >(
    async (request) =>
      fetch(SERVER_URL + "user/login", {
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
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { mutateAsync, isError: isError as boolean };
};
