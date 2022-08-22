import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      "50": "#FFFCF8",
      "100": "#FBEEE6",
      "200": "#EEB389",
      "300": "#E99C66",
      "400": "#E48542",
      "500": "#DD6E20",
      "600": "#AC5619",
      "700": "#7B3D12",
      "800": "#4A250B",
      "900": "#190C04",
      main: "#FF8019",
      accent: "#DDA333",
      contrastText: "#fff",
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
