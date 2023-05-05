import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "../Academy/PromoSection";
import CategoriesSection from "./CategoriesSection";
import FutureSection from "../Academy/FutureSection";
import ExamListSection from "../ExamsHome/ExamListSection";
import PublicationListSection from "../Publications/PublicationListSection";
import TestimonialSection from "../Academy/TestimonialSection";
//
import { ExamAndCourseFunc } from "./interfaceType";

const ExamAndCourse: ExamAndCourseFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <CategoriesSection />
      <PublicationListSection />
      <FutureSection />
      <ExamListSection />
      <TestimonialSection />
      <PromoSection link="/library" />
    </Box>
  );
};
export default ExamAndCourse;
