import { useQuery } from "react-query";
import { useUserData } from "../../contexts/userDataContext";
import { SERVER_URL } from "../../serverUrl";

export const useGetQRCode = (roomName: string) => {
  const { userData } = useUserData();
  const query = useQuery(`qr` + roomName, () =>
    fetch(SERVER_URL + "room/qrCode/" + roomName, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userData?.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.blob()),
  );

  return query;
};
