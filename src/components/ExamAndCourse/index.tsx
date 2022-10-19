import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "../Academy/PromoSection";
import CategoriesSection from "./CategoriesSection";
import FutureSection from "../Academy/FutureSection";
import ExamListSection from "../Exam/ExamListSection";
import CourseListSection from "../Academy/CourseListSection";
import TestimonialSection from "../Academy/TestimonialSection";
//
import { ExamAndCourseFunc } from "./interfaceType";

const ExamAndCourse: ExamAndCourseFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <CategoriesSection />
      <CourseListSection />
      <FutureSection />
      <ExamListSection />
      <TestimonialSection />
      <PromoSection />
    </Box>
  );
};
export default ExamAndCourse;
