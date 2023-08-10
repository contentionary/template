import React from "react";
// mui components, { forwardRef }
import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";

const WrappedButtonBase = (props: ButtonBaseProps) => <ButtonBase {...props} />;
WrappedButtonBase.muiName = "ButtonBase";

export default WrappedButtonBase;
