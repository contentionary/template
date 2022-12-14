import { makeStyles } from "@mui/styles";
import { theme } from "@src/styles/theme";

export default makeStyles({
  serviceHeader: {
    fontStyle: "normal",
    fontWeight: 500,
    color: "#333333",
    fontSize: 40,

    [theme().breakpoints.down("sm")]: {
      fontSize: 28,
    },
  },
  pluginName: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 26,
    color: "#333333",
    [theme().breakpoints.down("sm")]: {
      fontSize: 22,
    },
  },
  poweredBy: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    [theme().breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },

  pluginDescription: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 17,
    color: "#616161",
    marginBottom: 5,
    height: 140,
    [theme().breakpoints.down("sm")]: {
      fontSize: 14,
      height: 90,
    },
  },
});
