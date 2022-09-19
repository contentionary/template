import Snackbar from "@mui/material/Snackbar";

interface Props {
  message: string;
  vertical?: "top" | "bottom";
  horizontal?: "right" | "left";
}

export default function SnackbarComponent({
  message,
  vertical = "top",
  horizontal = "right",
}: Props): JSX.Element {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={6000}
      open={message ? true : false}
      message={message}
      key={vertical + horizontal}
    />
  );
}
