import React from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import ExamsLayout from "./ExamsLayout";
// interface
import { ExamsPageFunc } from "./interfaceType";

const ExamsPage: ExamsPageFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <ExamsLayout />
    </Box>
  );
};

export default ExamsPage;
