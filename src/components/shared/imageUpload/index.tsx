import Typography from "@mui/material/Typography";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import Box from "@mui/material/Box";
import Dialog from "@src/components/shared/dialog";
import { useDialog } from "@src/hooks";
import TextFields from "@src/components/shared/input/textField";
import { useState } from "react";
import ImageCropper from "@src/components/shared/imageCropper";
import getCroppedImg from "@src/components/shared/imageCropper/cropImage";
import { ElementProps } from "@src/utils/interface";
import Image from "@src/components/shared/image";

interface Props {
  img: Record<string, string>;
  setImg: Function;
  uploadText: string;
  defaultImage: string;
  height?: number;
  width?: number;
  aspect?: any;
}

const UpdateBackground = ({
  setImg,
  img,
  uploadText,
  defaultImage,
  aspect = 1,
}: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewLogo, setPreviewLogo] = useState("");
  const [rotation, setRotation] = useState(0);
  function preView(e: ElementProps) {
    openDialog();
    const objectUrl = e.target.files && URL.createObjectURL(e.target.files[0]);
    objectUrl && setPreviewLogo(objectUrl);
    return () => objectUrl && URL.revokeObjectURL(objectUrl);
  }

  function selectImage() {
    const image = document.getElementById("backgroundImage");
    image && image.click();
  }

  async function croppedImage() {
    const croppedImage: any = await getCroppedImg(
      previewLogo,
      croppedAreaPixels,
      rotation
    );
    setImg(croppedImage);
    closeDialog();
  }

  return (
    <>
      <TextFields
        type="file"
        id="backgroundImage"
        name="file"
        sx={{ display: "none" }}
        onChange={preView}
      />
      {img.bobImage || defaultImage ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => selectImage()}
        >
          <Box sx={{ width: 500 }}>
            <Image
              src={img.bobImage ? img.bobImage : defaultImage}
              alt="publication"
              height="100%"
              width="100%"
              layout="responsive"
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" component="div">
            {uploadText}
          </Typography>
          <Box
            onClick={() => selectImage()}
            sx={{
              width: 170,
              height: 150,
              background: "#D9D9D9",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{
                background: "rgba(0, 0, 0, 0.6)",
                borderRadius: 1,
                color: "#fff",
                padding: "5px 20px",
              }}
            >
              Choose Image
            </Typography>
            <UploadFileOutlined sx={{ fontSize: 100 }} htmlColor="#888888" />
          </Box>
        </Box>
      )}
      <Dialog
        title="Upload image "
        isOpen={isOpen}
        width="lg"
        closeDialog={closeDialog}
        icon={
          <UploadFileOutlined
            sx={{ cursor: "pointer" }}
            onClick={selectImage}
          />
        }
        content={
          <Box
            sx={{
              width: "100%",
              height: "80vh",
            }}
          >
            <ImageCropper
              image={previewLogo}
              // cropSize={{
              //   width: width,
              //   height: height,
              // }}
              aspect={aspect}
              cropShape="rect"
              rotation={rotation}
              setRotation={setRotation}
              setCroppedAreaPixels={setCroppedAreaPixels}
              containerStyle={{
                position: "absolute",
                bottom: 120,
                left: "4%",
                width: "92%",
                top: 100,
              }}
              controlStyle={{
                position: "absolute",
                bottom: 60,
                left: "4%",
                width: "92%",
              }}
            />
          </Box>
        }
        btns={[
          {
            text: "Upload Image",
            action: croppedImage,
          },
          { text: "Cancel", action: () => closeDialog() },
        ]}
      />
    </>
  );
};

export default UpdateBackground;
