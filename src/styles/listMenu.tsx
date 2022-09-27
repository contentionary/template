import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const listMenuStyle = makeStyles({
  listMenuRoot: {
    "&.MuiList-root": {
      marginBottom: 4,
      "& a": {
        padding: "0.25rem 1rem",
        borderRadius: 4,
      },
      "& .MuiListItemText-root": {
        margin: 0,
      },
    },
  },
});
export default listMenuStyle;
