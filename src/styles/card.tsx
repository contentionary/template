import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { theme } from "./theme";

const cardStyle = makeStyles({
  breathCard: {
    position: "relative",
    "&.MuiBox-root .MuiPaper-root": {
      padding: "1rem",
      zIndex: 1,
      top: "50%",
      backgroundColor: "white",
      textAlign: "center",
      position: "absolute",
      transform: "translateY(-50%)",
      boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.06)",
      "&.right": {
        right: "0",
      },
      "&.left": {
        left: "0",
      },
    },
    "&.MuiBox-root .breath-img-container": {
      borderRadius: "1rem",
      width: "85%",
      height: "450px",
      overflow: "hidden",
      position: "relative",
      isolation: "isolate",
      transform: "translateZ(0)",
      "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
      "&::before": {
        content: "''",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        willChange: "transform",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        transition: "transform 0.75s cubic-bezier(.56,.82,.54,.99)",
      },
      "& img": {
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        willChange: "transform",
        transition: "transform 0.75s cubic-bezier(.56,.82,.54,.99)",
      },
      "&:hover::before, &:hover img": {
        transform: "scale(1.125)",
      },
    },
  },
  defaultCard: {
    height: "100%",
    transition: "300ms ease-out",
    boxShadow: "0px 0px 20px rgba(203, 203, 203, 0.25)",
    "&:hover": {
      transform: "translateY(-1rem)",
    },
    "&:focus": {
      boxShadow: "none",
      transform: "translateY(0)",
    },
    "&	.MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight": {
      opacity: 0,
    },
    "&	.MuiCardActionArea-root .MuiBox-root.card-img": {
      backgroundColor: alpha(theme().palette.text.primary, 0.05),
    },
  },
  get courseCard() {
    return {
      ...this.defaultCard,
    };
  },
  get publicationCard() {
    return {
      ...this.defaultCard,
    };
  },
  get examCard() {
    return {
      ...this.defaultCard,
      "& .MuiCardActionArea-root .MuiCardContent-root.exam-content": {
        position: "relative",
        backgroundColor: theme().palette.primary.main,
        "&:before": {
          top: -6,
          left: 0,
          content: "''",
          width: "calc(100% + 20px)",
          height: 20,
          position: "absolute",
          transformOrigin: "top",
          transform: "skew(-4deg) rotate(-2deg)",
          backgroundColor: theme().palette.primary.main,
        },
      },
    };
  },
});
export default cardStyle;
