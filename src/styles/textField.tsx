import { theme } from "./theme";
import { makeStyles } from "@mui/styles";
// import { alpha } from "@mui/material/styles";

const textFieldStyle = makeStyles({
  textField: {
    "& .MuiInputBase-root:hover, & .MuiInputBase-root:before": {
      borderBottom: `1px solid ${theme().palette.divider} !important`,
    },
    "&.no-scroll input[type=number]::-webkit-outer-spin-button, &.no-scroll input[type=number]::-webkit-inner-spin-button":
      {
        "-webkit-appearance": "none",
      },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&.pdfPageNum .MuiInputBase-root": {
      paddingLeft: 8,
      "& input": {
        paddingBottom: 2,
      },
    },
  },
});
export default textFieldStyle;
