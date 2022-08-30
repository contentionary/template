import React from "react";
//
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
//
import ReactPlayer from "react-player/youtube";
//
import useGlobalStyle from "@src/styles";
//
import { VideoModalFunc } from "./interfaceType";

const VideoModal: VideoModalFunc = ({ isOpen, setIsOpen }) => {
  const globalStyle = useGlobalStyle();
  const handleClose = () => setIsOpen(false);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Introduction to contentionary"
      aria-describedby="Introduction to contentionary"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={globalStyle.modalStyle}>
          <ReactPlayer
            controls={false}
            playing={isOpen}
            url="https://youtu.be/TT-oVoZgdX0"
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoModal;
