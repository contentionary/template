import React from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";

const Toast = (props: SnackbarProps) => {
  return <Snackbar {...props} />;
};

export default Toast;
