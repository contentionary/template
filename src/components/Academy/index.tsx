import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import FutureSection from "./FutureSection";
import CategoriesSection from "./CategoriesSection";
import CourseListSection from "./CourseListSection";
import TestimonialSection from "./TestimonialSection";
//
import { AcademyFunc } from "./interfaceType";

const Academy: AcademyFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <CategoriesSection />
      <CourseListSection />
      <FutureSection />
      <TestimonialSection />
      <PromoSection />
    </Box>
  );
};
export default Academy;
