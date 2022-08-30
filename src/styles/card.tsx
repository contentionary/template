import { makeStyles } from "@mui/styles";
// import { theme } from "./theme";

const cardStyle = makeStyles({
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
