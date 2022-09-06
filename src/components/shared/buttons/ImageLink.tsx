/* eslint-disable no-unused-vars */
import React from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import useButtonStyle from "@src/styles/button";
import { Link as MuiLink, LinkProps } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
// styles / interface
import { ImageLinkFunc } from "./InterfaceType";

const ImageLink: ImageLinkFunc = (props) => {
  const buttonStyle = useButtonStyle();
  const { src, alt, children, onClick, href } = props;

  return (
    <NextLink href={href} passHref>
      <ButtonBase
        focusRipple
        component={MuiLink}
        onClick={onClick}
        className={buttonStyle.imageButton}
      >
        <Box component="div" className="MuiImageBase-root">
          <Image layout="fill" objectFit="cover" alt={alt} src={src} />
        </Box>
        <Box component="span" className="MuiImageBackdrop-root" />
        <Box component="span" className="MuiImageFlex-root">
          {children}
        </Box>
      </ButtonBase>
    </NextLink>
  );
};

export default ImageLink;
