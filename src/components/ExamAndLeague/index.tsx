import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import CategoriesSection from "./CategoriesSection";
import FutureSection from "./FutureSection";
import ExamListSection from "../ExamsHome/ExamListSection";
import CompetitionListSection from "./CompetitionListSection";
import TestimonialSection from "../Academy/TestimonialSection";
//
import { LeagueFunc } from "./interfaceType";

const LeagueHomePage: LeagueFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <CategoriesSection />
      <ExamListSection />
      <FutureSection />
      <CompetitionListSection />
      <TestimonialSection />
      <PromoSection />
    </Box>
  );
};
export default LeagueHomePage;
