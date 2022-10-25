import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const formControlStyle = makeStyles({
  formControlGroup: {
    "&.MuiFormGroup-root.MuiFormGroup-row.nowrap": {
      "& label.MuiFormControlLabel-root span.MuiTypography-root.MuiFormControlLabel-label":
        { whiteSpace: "nowrap" },
    },
  },
});
export default formControlStyle;
