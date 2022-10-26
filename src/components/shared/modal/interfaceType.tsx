import { ModalProps } from "@mui/material/Modal";

export interface ModalComponentInt extends ModalProps {
  handleClose: () => void;
}
