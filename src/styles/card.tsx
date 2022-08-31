import { makeStyles } from "@mui/styles";
// import { theme } from "./theme";

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
      position: "relative",
      overflow: "hidden",
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
      "&:hover::before": {
        transform: "scale(1.125)",
      },
    },
  },
  courseCard: {
    boxShadow: "0px 0px 20px rgba(203, 203, 203, 0.25)",
    transition: "300ms ease-out",
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
  },
});
export default cardStyle;
