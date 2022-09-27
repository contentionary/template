import { makeStyles } from "@mui/styles";
import {theme} from "@src/styles/theme";

export const useStyles = makeStyles({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: 955,
      width: "70%",
      marginTop: 30,
    },
    [theme.breakpoints.down("md")]: {
      marginTop: 30,
    },
    marginBottom: 40,
  },
  paper: {
    boxSizing: "border-box",
    background: "#FFFFFF",
    border: "1px solid #BDBDBD",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    [theme.breakpoints.up("lg")]: {
      // height: 916,
      height: 650,
    },
    [theme.breakpoints.down("md")]: {
      paddingBottom: 30,
    },
  },
  contentContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    [theme.breakpoints.down("md")]: {
      marginTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  select: {
    width: 274,
  },
  selected: {
    height: 40,
  },
  menu: {
    width: 400,
    background: "red",
  },
  price: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 25,

    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  choose: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 20,
    color: "#000000",
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
  clickOption: {
    color: "#555555",
    fontWeight: 400,
    fontFamily: "Open Sans",
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  inputIcon: {
    borderTop: "1px solid #CCCCCC",
    borderLeft: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
    borderRadius: "5px 0 0 5px",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 0 10px 10px",
  },
  input: {
    borderTop: "1px solid #CCCCCC !important",
    borderLeft: "none !important",
    borderRadius: "0 5px 5px 0 !important",
  },
  activeCard: {
    background: "#FFFBF4",
    border: "3px solid #F57E27",
  },
  inActive: {
    background: "#F9F9F9",
    border: "3px solid #DDDDDD",
  },
  general: {
    borderRadius: 5,
    cursor: "pointer",
    zIndex: -1,
  },
  cardHeight: {
    height: 150,
    [theme.breakpoints.down("md")]: {
      height: 200,
    },
  },
  transferCardHeight: {
    height: 97,
    [theme.breakpoints.down("md")]: {
      height: 129,
    },
  },
  contentClass: {
    [theme.breakpoints.down("md")]: {
      height: 120,
    },
  },
  tansferContentClass: {
    [theme.breakpoints.down("md")]: {
      height: 95,
    },
  },
});
