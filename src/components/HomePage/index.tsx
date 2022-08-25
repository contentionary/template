import React, { Fragment } from "react";
//
import Box from "@mui/material/Box";
//
import HeroSection from "./HeroSection";
import StepSection from "./StepSection";
import StartSection from "./StartSection";
import BuiltSection from "./BuiltSection";
import CenterSection from "./CenterSection";
import PromiseSection from "./PromiseSection";
import PartnersSection from "./PartnersSection";
import TestimonialSection from "./TestimonialSection";
//
import { HomePageFunc } from "./interfaceType";

const HomePage: HomePageFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <StepSection />
      <CenterSection />
      <PromiseSection />
      <PartnersSection />
      <BuiltSection />
      <TestimonialSection />
      <StartSection />
    </Box>
  );
};
export default HomePage;
