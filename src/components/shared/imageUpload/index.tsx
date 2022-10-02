import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import Box from "@mui/material/Box";
import Dialog from "@src/components/shared/dialog";
import { useDialog } from "@src/hooks";
import TextFields from "@src/components/shared/input/textField";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import ImageCropper from "@src/components/shared/imageCropper";
import getCroppedImg from "@src/components/shared/imageCropper/cropImage";
import { CameraEnhanceOutlined } from "@mui/icons-material";
import { ElementProps } from "@src/utils/interface";
import Image from "next/image";

interface Props {
  img: Record<string, string>;
  setImg: Function;
  uploadText: string;
}

const UpdateBackground = ({ setImg, img, uploadText }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewLogo, setPreviewLogo] = useState("");
  const [rotation, setRotation] = useState(0);
  const [show, setShow] = useState(true);

  function preView(e: ElementProps) {
    const objectUrl = e.target.files && URL.createObjectURL(e.target.files[0]);
    objectUrl && setPreviewLogo(objectUrl);
    setShow(false);
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
  }

  return (
    <>
      <ListItem disablePadding onClick={() => openDialog()}>
        <ListItemButton sx={{ pl: 5 }}>
          <ListItemIcon>
            <CameraEnhanceOutlined />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: "#616161",
              fontWeight: 400,
              fontSize: 14,
              fontStyle: "normal",
            }}
            primary={uploadText}
          />
        </ListItemButton>
      </ListItem>
      {img && <Image src={img.bobImage} alt="cropping" />}
      <Dialog
        title="Upload logo image "
        isOpen={isOpen}
        closeDialog={closeDialog}
        icon={
          <CameraAltOutlined sx={{ cursor: "pointer" }} onClick={selectImage} />
        }
        content={
          <Box
            sx={{
              width: 550,
              height: 520,
              display: show ? "flex" : "",
              justifyContent: "center",
            }}
          >
            <TextFields
              type="file"
              id="backgroundImage"
              name="file"
              sx={{ display: "none" }}
              onChange={preView}
            />
            <ImageCropper
              image={previewLogo}
              cropSize={{ width: 100, height: 100 }}
              cropShape="rect"
              rotation={rotation}
              setRotation={setRotation}
              setCroppedAreaPixels={setCroppedAreaPixels}
              show={show}
            />
            {show && (
              <ButtonComponent
                sx={{ alignSelf: "center" }}
                color="primary"
                variant="contained"
                onClick={() => {
                  selectImage();
                }}
              >
                Upload Logo Image
              </ButtonComponent>
            )}
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
