import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

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
  value: number;
  className?: string;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          style={{ fontSize: 8, color: "#616161" }}
          // color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
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
    <CircularProgressWithLabel
      color={color}
      sx={sx}
      size={size}
      variant={variant}
      value={value}
      thickness={thickness}
      className={className}
    />
  );
}
