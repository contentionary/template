import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import FutureSection from "./FutureSection";
import BestAuthorSection from "./BestAuthorSection";
import TestimonialSection from "./TestimonialSection";
import PublicationListSection from "./PublicationListSection";
//
import { PublicationsFunc } from "./interfaceType";

const Publications: PublicationsFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <PublicationListSection />
      <BestAuthorSection />
      <FutureSection />
      <TestimonialSection />
      <PromoSection />
    </Box>
  );
};
export default Publications;
