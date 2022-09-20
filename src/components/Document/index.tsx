import React from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import ReaderSection from "./ReaderSection";
// interface
import { DocumentFunc } from "./interfaceType";

const Document: DocumentFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <ReaderSection />
    </Box>
  );
};

export default Document;
