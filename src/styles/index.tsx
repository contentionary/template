import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

export const appGradient = `linear-gradient(92.54deg, ${
  theme.palette.primary.main
} -14.34%, ${"#DDA333"} 98.84%)`;

export const appShadow = {
  small: "0px 0px 24px rgba(0, 0, 0, 0.06)",
  main: "0px 0px 20px rgba(203, 203, 203, 0.25)",
};

export default makeStyles({
  "@keyframes scroll-x": {
    from: {
      transform: "translateX(var(--scroll-start))",
    },
    to: {
      transform: "translateX(var(--scroll-end))",
    },
  },
  hiddenScrollbar: {
    "-ms-overflow-style": "none",
    "scrollbar-color": "transparent transparent",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& ::-moz-scrollbar": {
      display: "none",
    },
  },
  underlinedCurve: {
    position: "relative",
    "&:after": {
      left: 0,
      content: "''",
      height: "10px",
      width: "100%",
      bottom: "-10px",
      borderRadius: "50%",
      position: "absolute",
      clipPath: "inset(0 0 50% 0)",
      border: `solid 2px ${theme.palette.primary.main}`,
      borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
    },
  },
  bgPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  bgWhiteGlossy: {
    border: "none",
    backdropFilter: "blur(20px)",
    boxShadow: "rgba(255, 255, 255, 0.8) 0px -1px 1px inset",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  bgArtifact: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left, bottom right",
    backgroundImage:
      "url(images/bg-artifacts/picture-artifact.png), url(images/bg-artifacts/dotted-pattern.png)",
  },
  get bgArtifactFlipped() {
    return {
      ...this.bgArtifact,
      transform: "scaleX(-1)",
      "& > *": {
        transform: "scaleX(-1)",
      },
    };
  },
  bgGradient: {
    background: appGradient,
  },
  paperShadow: {
    boxShadow: appShadow.small,
  },
  paperShadowSm: {
    boxShadow: appShadow.main,
  },
  textGradient: {
    background: appGradient,
    ["-webkit-background-clip"]: "text",
    ["-webkit-text-fill-color"]: "transparent",
  },
  text2LineTruncate: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    textOverflow: "ellipsis",
    "-webkit-box-orient": "vertical",
  },
  navbarMenuStyle: {
    "&.MuiPopover-root": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      transition: "300ms ease-in",
    },
    "& .MuiPopover-paper": {
      maxWidth: 576,
      borderRadius: "8px",
      backgroundColor: "#FFFFFF",
      boxShadow: appShadow.small,
    },
  },
  modalStyle: {
    top: "50%",
    left: "50%",
    maxWidth: "100%",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px",
    backgroundColor: "black",
    transform: "translate(-50%, -50%)",
    position: "absolute" as "absolute",
    "& .react-player": {
      [theme.breakpoints.down("sm")]: { width: "100vw !important" },
    },
  },
  appIconButton: {
    borderRadius: 4,
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover, &.Mui-focusVisible": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
  },
  stepsTimeline: {
    pl: 0,
    "& .MuiTimelineItem-root:before": {
      flex: 0,
      padding: 0,
    },
    "& .MuiTimelineItem-root .MuiTimelineDot-root": {
      padding: 0,
      margin: 0,
      border: "none",
      fontSize: "20px",
      fontWeight: "600",
      boxShadow: "none",
      color: "#DD6E20",
      backgroundColor: "transparent",
    },
    "& .MuiTimelineItem-root .MuiTimelineConnector-root": {
      width: "1px",
      backgroundColor: "#E99C66",
    },
    "& .MuiTimelineItem-root .MuiTimelineContent-root": {
      paddingTop: 0,
      paddingLeft: "2rem",
      maxWidth: "500px",
    },
  },
  marquee: {
    " --size": "clamp(10rem, 1rem + 40vmin, 30rem)",
    "--gap": "calc(var(--size) / 14)",
    "--duration": "20s",
    "--scroll-start": 0,
    "--scroll-end": "calc(-100% - var(--gap))",
    gap: "var(--gap)",
    display: "flex",
    overflow: "hidden",
    userSelect: "none",
    maskImage: `linear-gradient(
      to right,
      hsl(0 0% 0% / 0),
      hsl(0 0% 0% / 1) 10%,
      hsl(0 0% 0% / 1) 90%,
      hsl(0 0% 0% / 0)
    )`,
    "& .marquee__content": {
      gap: "1rem",
      flexShrink: 0,
      display: "flex",
      minWidth: "100%",
      alignItems: "center",
      animation: "$scroll-x var(--duration) linear infinite",
      justifyContent: "space-around",
    },
  },
});
