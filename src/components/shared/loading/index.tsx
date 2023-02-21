import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
interface Props {
  variant?: "determinate" | "indeterminate";
  thickness?: number;
  sx?: object;
  size?: number | string;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | undefined;
  value?: number;
  className?: string;
}
export default function CircularUnderLoad({
  variant,
  thickness,
  sx,
  size,
  color,
  value,
  className,
}: Props) {
  return (
    <CircularProgress
      color={color}
      sx={sx}
      size={size || 12}
      variant={variant}
      value={value}
      thickness={thickness}
      className={className}
    />
  );
}
