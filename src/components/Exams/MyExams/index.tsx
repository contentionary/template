import React from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import MyExamsLayout from "./MyExamsLayout";
// interface
import { ExamsPageFunc } from "../interfaceType";

const MyExamsPage: ExamsPageFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <MyExamsLayout />
    </Box>
  );
};

export default MyExamsPage;
