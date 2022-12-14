import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { theme } from "./theme";

const treeViewStyle = makeStyles({
  treeViewRoot: {
    "& .MuiTreeItem-root": {
      paddingBottom: theme().spacing(0.5),
      "& .MuiTreeItem-content": {
        borderRadius: theme().spacing(0.5),
        padding: `${theme().spacing(0.5)} ${theme().spacing(1)}`,
        "&:hover, &.Mui-selected": {
          backgroundColor: theme().palette.action.hover,
        },
      },
      "& .MuiTreeItem-group": {
        borderLeft: `1px dashed ${alpha(theme().palette.text.primary, 0.2)}`,
      },
    },
  },
});
export default treeViewStyle;
