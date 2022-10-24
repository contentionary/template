import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
// interface
import { ModalComponentInt } from "./interfaceType";

const style = {
  p: 2,
  top: "50%",
  left: "50%",
  maxWidth: 580,
  boxShadow: 24,
  borderRadius: 1,
  bgcolor: "background.paper",
  transform: "translate(-50%, -50%)",
  position: "absolute" as "absolute",
};

const ModalComponent = (props: ModalComponentInt) => {
  const { handleClose, open, children, ...rest } = props;

  return (
    <Modal open={open} onClose={handleClose} {...rest}>
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
