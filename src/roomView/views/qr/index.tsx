import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useGetQRCode } from "../../queries/getQRCode";

const MainCameraContainer = styled.div`
  max-height: calc(100% - 150px);
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  height: calc(80% - 150px);
`

export const CodeQR = () => {
  const { id } = useParams()
  const qr = useGetQRCode(id as string);
  return (
    <MainCameraContainer>
      <h1>Scan the QR code in your mobile application</h1>
      <InnerContainer>{qr.isLoading ? <h1>loading</h1> : <img height="80%" src={URL.createObjectURL(qr.data as Blob)} />}</InnerContainer>
    </MainCameraContainer>
  );
};

