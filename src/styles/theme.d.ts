import React from "react";
import {
  Color,
  PaletteColorOptions,
  SimplePaletteColorOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: PaletteColorOptions;
      neutral: PaletteColorOptions;
    };
  }
  export interface PaletteOptions {
    paletteColors: {
      [key: string]: Partial<Color> | SimplePaletteColorOptions;
    }[];
  }
  export interface Palette {
    paletteColors: {
      [key: string]: Partial<Color> | SimplePaletteColorOptions;
    }[];
  }
}
