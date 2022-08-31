import React from "react";
//
import Avatar from "@mui/material/Avatar";
// icons
import TickIcon from "@src/assets/icons/tick.svg";
//

const TickAvatar = () => {
  // const theme = useTheme();
  return (
    <Avatar
      sx={{
        bgcolor: "#EEB389",
        width: 24,
        height: 24,
        mr: 2,
      }}
    >
      <TickIcon style={{ transform: "scale(2)" }} />
    </Avatar>
  );
};

export default TickAvatar;
