import React from "react";
import Image from "next/image";
// mui component
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//

const UnderConstruction = () => {
  // const theme = useTheme();
  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Box maxWidth={400} textAlign="center">
        <Image
          width={400}
          height={400}
          objectFit="contain"
          layout="responsive"
          alt="Under construction"
          src="/images/state/under-construction.svg"
        />
        <Typography variant="h5">Bear with us please 🐻</Typography>
        <Typography paragraph>This page is under construction...</Typography>
      </Box>
    </Box>
  );
};

export default UnderConstruction;
