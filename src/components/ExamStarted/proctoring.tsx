import { request, handleError } from "@src/utils";
import { useRef, useEffect } from "react";
import Webcam from "react-webcam";

function App({
  proctoredId,
  centreId,
}: {
  proctoredId: string;
  centreId: string;
}) {
  const savedProctoring = useRef<any>(null);
  const videoConstraints = {
    width: 250,
    height: 250,
    facingMode: "user",
  };

  const webcamRef = useRef<any>();
  useEffect(() => {
    const saveImage = async () => {
      try {
        const imageSrc = "test.png";
        if (imageSrc && proctoredId) {
          await request.patch({
            url: `/centre/${centreId}/protor-content/${proctoredId}`,
            data: { content: imageSrc, tabSwitchCount: 5 },
          });
        }
      } catch (error) {
        console.log(handleError(error).message);
      }
    };
    savedProctoring.current = setInterval(() => {
      saveImage();
    }, 300100);
  }, [proctoredId, centreId, webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={250}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={250}
        videoConstraints={videoConstraints}
      />
    </>
  );
}

export default App;
