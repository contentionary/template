import React from "react";
//
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
//
// import ReactPlayer from "react-player";
import VideoPlayer from "@src/template/components/shared/video/VideoPlayer";
//
import useGlobalStyle from "@src/template/styles";
//
import { VideoModalFunc } from "./interfaceType";

const VideoModal: VideoModalFunc = ({ isOpen, setIsOpen, src }) => {
  const globalStyle = useGlobalStyle();
  const handleClose = () => setIsOpen(false);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Introduction to Edtify"
      aria-describedby="Introduction to Edtify"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={globalStyle.modalStyle}>
          <VideoPlayer src={src} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoModal;
