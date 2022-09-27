import { makeStyles } from "@mui/styles";
import { theme } from "@src/styles/theme";

export default makeStyles({
  createFormConatiner: {
    [theme.breakpoints.up("lg")]: {
      padding: "70px 0px 40px 70px",
    },
  },
  registerWithUs: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 32,
    color: "#333333",
  },
  helperTextClass: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    color: "#616161",
    marginBottom: 4,
    marginLeft: 0,
  },
  btn: {
    background: "linear-gradient(92.54deg, #DD6E20 -14.34%, #DDA333 98.84%)",
    width: "100%",
    marginTop: 15,
    fontFamily: "Matter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 18,
    marginBottom: 10,
    padding: 13,
  },
  loginInstead: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    color: "#888888",
  },
  forgotten: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    color: "#313131",
    textAlign: "end",
    marginBottom: 15,
  },
});
