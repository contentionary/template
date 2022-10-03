import Stack from "@mui/system/Stack";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

interface Props {
  image: string;
  aspect?: any;
  cropShape?: "round" | "rect";
  cropSize?: any;
  setCroppedAreaPixels: any;
  setRotation: Function;
  rotation: number;
  show: boolean;
  containerStyle?: object;
  controlStyle?: object;
}

const ImageCropper = ({
  image,
  aspect = 4 / 3,
  cropSize,
  cropShape = "round",
  setCroppedAreaPixels,
  setRotation,
  rotation,
  show,
  containerStyle,
  controlStyle,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const zoomImage = (event: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
  };

  const rotateImage = (event: Event, newValue: number | number[]) => {
    setRotation(newValue as number);
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels]
  );

  return (
    <div>
      <div className="crop-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={cropShape}
          cropSize={cropSize}
          rotation={rotation}
          showGrid={false}
          objectFit="auto-cover"
          style={{ containerStyle: containerStyle }}
        />
      </div>
      {!show && (
        <Stack
          sx={
            containerStyle
              ? controlStyle
              : { position: "absolute", bottom: 70, left: "4%", width: "92%" }
          }
          direction="row"
          spacing={2}
        >
          <Stack direction="row" spacing={2} sx={{ width: "45%" }}>
            <Typography
              style={{
                color: "#616161",
                fontFamily: "Poppins",
                fontSize: 16,
                fontWeight: 400,
                fontStyle: "normal",
              }}
              variant="subtitle1"
              component="p"
            >
              ZOOM
            </Typography>
            <Slider
              size="small"
              aria-label="Volume"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={zoomImage}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ width: "55%" }}>
            <Typography
              style={{
                color: "#616161",
                fontFamily: "Poppins",
                fontSize: 16,
                fontWeight: 400,
                fontStyle: "normal",
              }}
              variant="subtitle1"
              component="p"
            >
              ROTATION
            </Typography>
            <Slider
              size="small"
              aria-label="Volume"
              min={0}
              max={360}
              step={10}
              value={rotation}
              onChange={rotateImage}
            />
          </Stack>
        </Stack>
      )}
    </div>
  );
};
export default ImageCropper;
