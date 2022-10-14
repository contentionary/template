import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

interface Props {
  message: string;
  vertical?: "top" | "bottom";
  horizontal?: "right" | "left";
  showToast: Function;
  status: boolean;
}

export default function Toast({
  message = "Hello",
  showToast,
  status = true,
  vertical = "top",
  horizontal = "right",
}: Props) {
  return (
    <Snackbar
      sx={{ zIndex: 30000 }}
      anchorOrigin={{
        vertical: vertical,
        horizontal: horizontal,
      }}
      open={status}
      autoHideDuration={10000}
      onClose={() => showToast(false)}
      message={
        <span style={{ color: "#fff" }} id="message-id">
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => showToast(false)}
        >
          <Close />
        </IconButton>,
      ]}
    />
  );
}
