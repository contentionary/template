import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import FutureSection from "./FutureSection";
import ExamListSection from "./ExamListSection";
import TestimonialSection from "./TestimonialSection";
//
import { ExamFunc } from "./interfaceType";

const Exam: ExamFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <ExamListSection />
      <FutureSection />
      <TestimonialSection />
      <PromoSection />
    </Box>
  );
};
export default Exam;
