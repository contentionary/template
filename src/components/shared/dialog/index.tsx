import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface BtnsProps {
  text: string | JSX.Element;
  action: Function;
  variant?: "text" | "outlined" | "contained" | undefined;
  className?: string;
  sx?: object;
}

interface Props {
  isOpen: boolean;
  closeDialog: Function;
  message?: string;
  title: string;
  btns?: Array<BtnsProps>;
  content?: JSX.Element;
  icon?: JSX.Element;
}

export default function ResponsiveDialog({
  isOpen,
  closeDialog,
  message,
  title,
  btns,
  content,
  icon,
}: Props): JSX.Element {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={() => closeDialog()}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {title} {icon && icon}
      </DialogTitle>
      <DialogContent>
        {message && <DialogContentText>{message}</DialogContentText>}
        {content && content}
      </DialogContent>
      {btns && (
        <DialogActions>
          {btns.map(({ text, action, variant, className, sx }, index) => (
            <Button
              key={index}
              variant={variant}
              autoFocus
              onClick={() => action()}
              className={className}
              sx={sx}
            >
              {text}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}
