import { useQuery } from "react-query";
import { useCache } from "../../contexts/dataCacheContext";
import { SERVER_URL } from "../../serverUrl";

export const useGetQRCode = (roomName: string) => {
  const { userData } = useCache();
  const query = useQuery(`qr` + roomName, () =>
    fetch(SERVER_URL + "room/qrCode", {
      method: "POST",
      body: JSON.stringify({ roomName }),
      headers: {
        authorization: `Bearer ${userData?.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.blob()),
  );

  return query;
}

