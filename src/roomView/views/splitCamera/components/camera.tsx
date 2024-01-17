import { styled } from "styled-components";
import ReactFlvPlayer from "../../../../components/ReactFlvPlayer";
import { useEndRecording } from "../../../mutations/endRecording";
import { useStartRecording } from "../../../mutations/startRecording";
import { useCheckCamera } from "../../../queries/getRecordigState";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const BottomContainer = styled.div`
  height: 5vh;
  font-size: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.colors.cameraLight};
  background-color: ${(props) => props.theme.colors.cameraDarker};
  border-radius: 10px;
`;

const CameraContainer = styled.div`
  background-color: ${(props) => props.theme.colors.cameraDark};
  border: 2px solid black;
  border-radius: 10px;
  height: 40vh;
`;

const NameContainer = styled.div`
  margin-left: 10px;
  width: 100%;
`;

const RecordContainer = styled.div`
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.colors.red};
  border-radius: 15px;
  transition: 0.2s all;
  margin-right: 10px;
  font-size: 30px;
  vertically-align: middle;
  justify-text: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.cameraDark};
    cursor: pointer;
  }
`;

export type CameraProps = {
  url: string;
  name: string;
  id?: string;
  onClick?: any;
  isOwnedRoom: boolean;
};

export const Camera = ({
  url,
  name,
  onClick,
  id,
  isOwnedRoom,
}: CameraProps) => {
  const end = useEndRecording(id ?? "");
  const start = useStartRecording(id ?? "");
  const check = useCheckCamera(id ?? "");
  return (
    <CameraContainer onClick={onClick}>
      <ReactFlvPlayer url={url} height="35vh" width="100%" />
      <BottomContainer>
        <NameContainer>{name}</NameContainer>
        {isOwnedRoom && (
          <RecordContainer
            onClick={() => {
              if (check.response) {
                start();
              } else {
                end();
              }
            }}
          >
            {check.response ? (
              <RadioButtonCheckedIcon fontSize="inherit" />
            ) : (
              <RadioButtonUncheckedIcon fontSize="inherit" />
            )}
          </RecordContainer>
        )}
      </BottomContainer>
    </CameraContainer>
  );
};
