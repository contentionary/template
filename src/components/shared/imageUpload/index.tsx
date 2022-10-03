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
import Image from "@src/components/shared/image";

interface Props {
  img: Record<string, string>;
  setImg: Function;
  uploadText: string;
  actionListBtnStyle?: {};
  defaultImage: string;
}

const UpdateBackground = ({
  setImg,
  img,
  uploadText,
  actionListBtnStyle,
  defaultImage,
}: Props) => {
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
    closeDialog();
  }

  return (
    <>
      {img.bobImage || defaultImage ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => openDialog()}
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
        <Box sx={{ width: 300 }}>
          <ListItem sx={{ mb: 2 }} disablePadding onClick={() => openDialog()}>
            <ListItemButton
              sx={actionListBtnStyle ? actionListBtnStyle : { pl: 0 }}
            >
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
        </Box>
      )}
      <Dialog
        title="Upload image "
        isOpen={isOpen}
        width="md"
        closeDialog={closeDialog}
        icon={
          <CameraAltOutlined sx={{ cursor: "pointer" }} onClick={selectImage} />
        }
        content={
          <Box
            sx={{
              width: "100%",
              height: 700,
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
              cropSize={{ width: 600, height: 600 }}
              cropShape="rect"
              rotation={rotation}
              setRotation={setRotation}
              setCroppedAreaPixels={setCroppedAreaPixels}
              show={show}
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
