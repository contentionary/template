/* eslint-disable no-unused-vars */
import React from "react";
// next components
import Image from "next/image";
// mui components
import Box from "@mui/material/Box";
import useButtonStyle from "@src/styles/button";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
// component
// styles / interface
import { ImageButtonFunc } from "./InterfaceType";

const ImageButton: ImageButtonFunc = (props) => {
  const buttonStyle = useButtonStyle();
  const { src, alt, children, onClick, priority } = props;

  return (
    <ButtonBase
      focusRipple
      onClick={onClick}
      className={buttonStyle.imageButton}
    >
      <Box component="div" className="MuiImageBase-root">
        <Image
          alt={alt}
          src={src}
          layout="fill"
          objectFit="cover"
          priority={priority}
        />
      </Box>
      <Box component="span" className="MuiImageBackdrop-root" />
      <Box component="span" className="MuiImageFlex-root">
        {children}
      </Box>
    </ButtonBase>
  );
};

export default ImageButton;
