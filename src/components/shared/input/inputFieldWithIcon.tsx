import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

interface Props {
  placeholder?: string;
  icon?: JSX.Element;
  id?: string;
  variant?: "outlined" | "filled" | "standard";
  sx?: object;
  name?: string;
  onChange?: Function;
  size?: "small" | "medium" | undefined;
}
export default function InputWithIcon({
  placeholder,
  icon,
  id,
  variant = "outlined",
  sx,
  name,
  onChange,
  size,
}: Props): JSX.Element {
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      sx={sx}
      name={name}
      onChange={(e) => onChange && onChange(e)}
      variant={variant}
      size={size}
    />
  );
}
