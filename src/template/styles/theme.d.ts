import { Color, SimplePaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface Theme {
    palette: {
      primary: Color | SimplePaletteColorOptions;
      secondary: Color | SimplePaletteColorOptions;
    };
  }
}
