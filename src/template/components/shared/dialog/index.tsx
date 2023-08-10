import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dynamic from "next/dynamic";

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
  width?: any;
  value?: number;
  isLoading?: boolean;
}

export default function ResponsiveDialog({
  isOpen,
  closeDialog,
  message,
  title,
  btns,
  content,
  icon,
  width,
  value,
  isLoading,
}: Props): JSX.Element {
  const Loading = dynamic(
    () => import("@src/template/components/shared/loading/linearProgress")
  );
  return (
    <Dialog
      fullWidth={true}
      maxWidth={width}
      open={isOpen}
      onClose={() => closeDialog()}
      aria-labelledby="responsive-dialog-title"
    >
      {isLoading && <Loading value={value} />}
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
