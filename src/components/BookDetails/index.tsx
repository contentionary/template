import React from "react";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
//
import { BookDetailsPageFunc } from "./interfaceType";

const BookDetails: BookDetailsPageFunc = () => {
  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection />
      <DetailsSection />
    </Box>
  );
};

export default BookDetails;
