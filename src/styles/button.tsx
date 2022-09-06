import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const buttonStyle = makeStyles({
  imageButton: {
    display: "block",
    height: 400,
    [theme.breakpoints.up("xs")]: { height: 250 },
    [theme.breakpoints.up("sm")]: { height: 350 },
    [theme.breakpoints.up("md")]: { height: 300 },
    [theme.breakpoints.up("lg")]: { height: 300 },
    [theme.breakpoints.up("xl")]: { height: 300 },
    minWidth: 200,
    position: "relative",
    width: "100% !important",
    "& .MuiImageBase-root": {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      position: "absolute",
      borderRadius: "0.5rem",
    },
    "& .MuiImageBackdrop-root": {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.4,
      borderRadius: "0.5rem",
      position: "absolute",
      backgroundColor: theme.palette.common.black,
      transition: theme.transitions.create("opacity"),
    },
    "& .MuiImageFlex-root": {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      color: "white",
      display: "flex",
      alignItems: "end",
      position: "absolute",
    },
    "& .MuiTypography-root": {
      gap: 8,
      padding: 8,
      display: "flex",
      alignItems: "center",
      transition: "300ms ease-out",
    },
    "& .MuiSvgFlip-root": {
      transformStyle: "preserve-3d",
      transition: "300ms ease-out",
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        paddingBottom: "1rem",
      },
      "& .MuiSvgFlip-root": {
        transform: "rotateY(180deg)",
      },
    },
  },
});

export default buttonStyle;
