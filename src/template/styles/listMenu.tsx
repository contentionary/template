import { makeStyles } from "@mui/styles";
// import { theme } from "./theme";

const listMenuStyle = makeStyles({
  listMenuRoot: {
    "&.MuiList-root": {
      marginBottom: 4,
      "& a": {
        borderRadius: 4,
        transition: "250ms ease-out",
        padding: "0.25rem 1rem 0.25rem 0",
        "&:hover": {
          padding: "0.25rem 1rem",
        },
      },
      "& .MuiListItemText-root": {
        margin: 0,
      },
    },
  },
});
export default listMenuStyle;
