import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const drawerWidth = 280;

const videoPageStyle = makeStyles({
  mainContainer: {
    maxWidth: "100vw",
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    "&.open": {
      marginLeft: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      "& .MuiTabs-root": {
        [theme.breakpoints.between("md", "lg")]: {
          maxWidth: "calc(100vw - 420px)",
        },
      },
    },
  },

  playerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    "&.MuiBox-root .player-box": {
      width: 1200,
      [theme.breakpoints.between("lg", "xl")]: {
        width: 920,
      },
      [theme.breakpoints.down("lg")]: {
        width: `calc(100vw - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        width: "100vw",
      },
      maxWidth: "100vw",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  lessonListDrawer: {
    flexShrink: 0,
    width: drawerWidth,
    zIndex: theme.zIndex.drawer,
    "& .MuiDrawer-paper": {
      top: 0,
      position: "sticky",
      width: drawerWidth,
      boxSizing: "border-box",
      borderRight: `1px solid ${theme.palette.divider}`,
      "& .list-content": {
        height: "100vh",
        maxHeight: 1520,
        overflow: "auto",
      },
    },
  },

  lessonListMobileDrawer: {
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },

  lessonListToggler: {
    left: drawerWidth - 20,
    top: "5rem",
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down("md")]: {
      position: "fixed",
    },
    [theme.breakpoints.up("md")]: {
      position: "absolute",
    },
    backgroundColor: "white",
    color: theme.palette.secondary.dark,
    transition: theme.transitions.create("left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "&.open": {
      transition: theme.transitions.create("left", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      left: "-16px",
    },
    "&:hover": {
      backgroundColor: "white",
    },
  },
});
export default videoPageStyle;
