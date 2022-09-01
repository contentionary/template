import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      // 50: "#FFFCF8",
      // 100: "#FBEEE6",
      // 200: "#EEB389",
      // 300: "#E99C66",
      // 400: "#DDA333",
      // 500: "#DD6E20",
      // 600: "#AC5619",
      // 700: "#7B3D12",
      // 800: "#4A250B",
      // 900: "#190C04",
      main: "#DD6E20",
      // alt: "#FF8019",

      contrastText: "#fff",
    },
    secondary: {
      // 50: "#E8E8E8",
      // 100: "#C2C2C2",
      // 200: "#9E9E9E",
      // 300: "#8A8A8A",
      // 400: "#757575",
      // 500: "#616161",
      // 600: "#454545",
      // 700: "#333333",
      // 800: "#121212",
      // 900: "#0F0F0F",
      // "alt-50": "#FAFAFA",
      light: "#616161",
      main: "#333333",
      dark: "#0F0F0F",
      contrastText: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: 700,
      color: "#333333",
      lineHeight: 1.125,
      fontSize: "clamp(2rem, -0.875rem + 8.333vw, 3.25rem)",
    },
    h2: {
      fontWeight: 700,
      color: "#333333",
      lineHeight: 1.125,
      fontSize: "clamp(1.875rem, -0.85rem + 8.333vw, 3rem)",
    },
    h3: {
      fontWeight: 600,
      color: "#333333",
      lineHeight: 1.125,
      fontSize: "clamp(1.75rem, -0.8rem + 7vw, 2.725rem)",
    },
    h4: {
      // fontSize: "1.75rem",
      fontWeight: 600,
      color: "#333333",
      fontSize: "clamp(1.5rem, -0.6rem + 6vw, 2rem)",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#333333",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#333333",
    },
    body1: {
      color: "#616161",
    },
    body2: {
      color: "#616161",
    },
    caption: {
      color: "#616161",
      lineHeight: "1rem",
    },
    fontFamily: ["'Matter'", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-Heavy.otf') format("truetype");
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-HeavyItalic.otf') format("truetype");
        font-weight: 900;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-Bold.otf') format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-BoldItalic.otf') format("truetype");
        font-weight: 700;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-SemiBold.otf') format("truetype");
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-SemiBoldItalic.otf') format("truetype");
        font-weight: 600;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-Medium.otf') format("truetype");
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-MediumItalic.otf') format("truetype");
        font-weight: 500;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-Regular.otf') format("truetype");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-RegularItalic.otf') format("truetype");
        font-weight: 400;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-Light.otf') format("truetype");
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Matter';
        src: url('/fonts/matter/Matter-LightItalic.otf') format("truetype");
        font-weight: 300;
        font-style: italic;
        font-display: swap;
      }`,
    },
  },
});
