import { useEffect, useRef } from "react";
import flvjs from "flv.js";

interface ReactFlvPlayerProps {
  url: string;
  height?: string;
  width?: string;
}

const ReactFlvPlayer: React.FC<ReactFlvPlayerProps> = ({
  url,
  height = "100%",
  width = "100%",
}: ReactFlvPlayerProps) => {
  const myRef = useRef<HTMLVideoElement | null>(null);
  const flvPlayerRef = useRef<any>(null);

  useEffect(() => {
    const initFlvPlayer = () => {
      if (flvjs.isSupported()) {
        flvPlayerRef.current = flvjs.createPlayer(
          {
            type: "flv",
            isLive: true,
            url,
            hasAudio: false,
            hasVideo: true,
          },
          {
            enableStashBuffer: true,
            stashInitialSize: 128,
          },
        );

        flvjs.LoggingControl.enableError = false;
        flvjs.LoggingControl.enableWarn = false;

        if (myRef.current) {
          flvPlayerRef.current.attachMediaElement(myRef.current);
          flvPlayerRef.current.load();
          flvPlayerRef.current.play().catch((e: any) => console.error(e));
          flvPlayerRef.current.on("error", (err: any) => {
            console.log(err);
          });
        }
      }
    };

    initFlvPlayer();

    return () => {
      console.log("unmounting");
      if (flvPlayerRef.current) flvPlayerRef.current.destroy();
    };
  }, [url]);

  return (
    <div>
      <video
        controls={false}
        muted={true}
        ref={myRef}
        style={{ height, width }}
      />
    </div>
  );
};

export default ReactFlvPlayer;
