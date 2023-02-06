import { request, uploadFiles } from "@src/utils";
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
        const imageSrc = await uploadFiles(
          webcamRef.current.getScreenshot() as string
        );
        if (imageSrc && proctoredId) {
          await request.patch({
            url: `/centre/${centreId}/protor-content/${proctoredId}`,
            data: { content: imageSrc, tabSwitchCount: 5 },
          });
        }
      } catch ({ message }) {
        console.log(message);
      }
    };
    savedProctoring.current = setInterval(() => {
      saveImage();
    }, 3000);
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
