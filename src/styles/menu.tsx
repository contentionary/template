import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const menuStyle = makeStyles({
  menuPaper: {
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    overflow: "visible",
    marginTop: "0.8rem",
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    filter: "drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.06))",
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      marginLeft: -0.5,
      marginRight: 1,
    },
    "&caret:before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      zIndex: 0,
      height: 10,
      backgroundColor: theme.palette.background.paper,
      transform: "translateY(-50%) rotate(45deg)",
    },
  },
});
export default menuStyle;
