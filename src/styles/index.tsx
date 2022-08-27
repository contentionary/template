import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

export const appGradient = `linear-gradient(92.54deg, ${theme.palette.primary.main} -14.34%, ${theme.palette.primary.accent} 98.84%)`;

export default makeStyles({
  "@keyframes scroll-x": {
    from: {
      transform: "translateX(var(--scroll-start))",
    },
    to: {
      transform: "translateX(var(--scroll-end))",
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
    boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.06)",
  },
  textGradient: {
    background: appGradient,
    ["-webkit-background-clip"]: "text",
    ["-webkit-text-fill-color"]: "transparent",
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
      color: theme.palette.primary[500],
      backgroundColor: "transparent",
    },
    "& .MuiTimelineItem-root .MuiTimelineConnector-root": {
      width: "1px",
      backgroundColor: theme.palette.primary[100],
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
    "--duration": "60s",
    "--scroll-start": 0,
    "--scroll-end": "calc(-100% - var(--gap))",
    gap: "var(--gap)",
    display: "flex",
    overflow: "hidden",
    userSelect: "none",
    maskImage: `linear-gradient(
      to right,
      hsl(0 0% 0% / 0),
      hsl(0 0% 0% / 1) 20%,
      hsl(0 0% 0% / 1) 80%,
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
