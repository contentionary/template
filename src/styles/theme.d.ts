import {
  Color,
  PaletteOptions,
  PaletteColorOptions,
  SimplePaletteColorOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: Color | SimplePaletteColorOptions;
      secondary: Color | SimplePaletteColorOptions;
    };
  }
}
