import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import Box from "@mui/material/Box";
import Dialog from "@src/components/shared/dialog";
import { useDialog } from "@src/hooks";
import TextFields from "@src/components/shared/input/textField";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import Loading from "@src/components/shared/loading";
import ImageCropper from "@src/components/shared/imageCropper";
import getCroppedImg from "@src/components/shared/imageCropper/cropImage";
import { CameraEnhanceOutlined } from "@mui/icons-material";
import { ElementProps, CentreProps } from "@src/utils/interface";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

interface Props {
  centre: CentreProps;
}

const UpdateBackground = ({ centre }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(centre?.backgroundImage);
  const [rotation, setRotation] = useState(0);
  const [show, setShow] = useState(centre?.backgroundImage ? false : true);

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

  async function submit() {
    try {
      setIsLoading(true);
      const croppedImage = await getCroppedImg(
        previewLogo,
        croppedAreaPixels,
        rotation
      );

      if (croppedImage) {
        const { data } = await request.post({
          url: "/file-upload-base64",
          data: { file: croppedImage.base64 },
        });
        if (data) {
          const res = await request.patch({
            url: `/centre/${centre?.id}/background`,
            data: { imageUrl: data.fileUrl },
          });
          centre.backgroundImage = res.data.backgroundImage;
          // setCentre({ ...centre });
          toggleToast(res.message);
          closeDialog();
        }
      }

      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  const btn = <>Upload Image {isLoading && <Loading size="small" />}</>;
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
            primary="Update Background"
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        width="md"
        title="Upload background image "
        isOpen={isOpen}
        closeDialog={closeDialog}
        icon={
          <CameraAltOutlined sx={{ cursor: "pointer" }} onClick={selectImage} />
        }
        content={
          <Box
            sx={{
              width: "100%",
              height: 600,
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
              cropSize={{ width: 450, height: 450 }}
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
                Upload Image
              </ButtonComponent>
            )}
          </Box>
        }
        btns={[
          {
            text: btn,
            action: submit,
          },
          { text: "Cancel", action: () => closeDialog() },
        ]}
      />
      {toastMessage && (
        <Toast
          showToast={toggleToast}
          status={Boolean(toastMessage)}
          message={toastMessage}
        />
      )}
    </>
  );
};

export default UpdateBackground;
