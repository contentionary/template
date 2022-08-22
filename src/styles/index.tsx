import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

export default makeStyles({
  bgPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  bgGradient: {
    background: `linear-gradient(92.54deg, ${theme.palette.primary.main} -14.34%, ${theme.palette.primary.accent} 98.84%)`,
  },
});
