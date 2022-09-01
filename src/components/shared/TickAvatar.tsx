import React from "react";
//
import Avatar from "@mui/material/Avatar";
// icons
import TickIcon from "@src/assets/icons/tick.svg";
//
interface TickAvatarProps {
  width?: number;
  height?: number;
  size?: number;
  mr?: number;
}

const TickAvatar = ({
  width = 24,
  height = 24,
  size = 2,
  mr = 2,
}: TickAvatarProps) => {
  // const theme = useTheme();
  return (
    <Avatar
      sx={{
        bgcolor: "#EEB389",
        width: width,
        height: height,
        mr: mr,
      }}
    >
      <TickIcon style={{ transform: `scale(${size})` }} />
    </Avatar>
  );
};

export default TickAvatar;
