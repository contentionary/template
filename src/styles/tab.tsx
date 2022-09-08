import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const tabStyle = makeStyles({
  appTab: {
    "&.MuiTabs-root": {
      marginLeft: "auto",
      marginRight: "auto",
      justifyContent: "center",
      "&.w-1100": {
        maxWidth: "1100px",
      },
      "&.border-bottom": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    "& .MuiTabs-flexContainer": {
      gap: "1rem",
      justifyContent: "space-between",
    },
    "& .MuiButtonBase-root": {
      paddingBottom: "1rem !important",
    },
    "& .MuiTabScrollButton-root": {
      paddingTop: "1rem !important",
      "&.Mui-disabled": { opacity: 0.3 },
    },
  },
});

export default tabStyle;
