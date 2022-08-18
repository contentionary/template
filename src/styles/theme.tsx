import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8019",
    },
    secondary: {
      main: green[500],
    },
  },
});
