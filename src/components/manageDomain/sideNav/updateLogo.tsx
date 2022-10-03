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
import { ElementProps } from "@src/utils/interface";
import { CentreProps } from "@src/utils/interface";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";

interface Props {
  centre: CentreProps;
}

const UpdateLogo = ({ centre }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(centre?.logo);
  const [rotation, setRotation] = useState(0);
  const [show, setShow] = useState(centre?.logo ? false : true);

  function preView(e: ElementProps) {
    const objectUrl = e.target.files && URL.createObjectURL(e.target.files[0]);
    objectUrl && setPreviewLogo(objectUrl);
    setShow(false);
    return () => objectUrl && URL.revokeObjectURL(objectUrl);
  }

  function selectImage() {
    const image = document.getElementById("logo");
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
            url: `/centre/${centre?.id}/logo`,
            data: { imageUrl: data.fileUrl },
          });
          centre.logo = res.data.logo;
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
            <CameraAltOutlined />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: "#616161",
              fontWeight: 400,
              fontSize: 14,
              fontStyle: "normal",
            }}
            primary="Edit Logo"
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        title="Upload image "
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
              id="logo"
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
                Upload Centre Image
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

export default UpdateLogo;
