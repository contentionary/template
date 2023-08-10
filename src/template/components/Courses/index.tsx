import React from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import CoursesLayout from "./CoursesLayout";
// interface
import { CoursesPageFunc } from "./interfaceType";

const CoursesPage: CoursesPageFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <CoursesLayout />
    </Box>
  );
};

export default CoursesPage;
