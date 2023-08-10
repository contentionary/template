import React from "react";
// mui components
import { AlertColor } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContentProps } from "@mui/material";
// app components
import Alert from "./Alert";
// style component
import { appShadow } from "@src/template/styles/index";

interface SnackbarInt {
  open: boolean;
  keyStr: string;
  message: string;
  severity?: AlertColor;

  action?: SnackbarContentProps["action"];
  // eslint-disable-next-line no-unused-vars
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}
const SnackbarComponent = React.forwardRef<HTMLDivElement, SnackbarInt>(
  function SnackbarComponent(props, ref) {
    const { open, keyStr, action, handleClose, message, severity } = props;
    return (
      <Snackbar
        open={open}
        key={keyStr}
        action={action}
        onClose={handleClose}
        message={!severity && message}
        sx={
          !severity
            ? {
                "& .MuiPaper-root": {
                  color: "secondary.light",
                  backgroundColor: "white",
                  boxShadow: appShadow.main,
                },
              }
            : { boxShadow: appShadow.main }
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        ref={ref}
      >
        {severity && (
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        )}
      </Snackbar>
    );
  }
);

export default SnackbarComponent;
