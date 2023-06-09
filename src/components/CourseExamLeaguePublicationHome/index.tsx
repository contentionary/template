import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import CategoriesSection from "./CategoriesSection";
import FutureSection from "./FutureSection";
import ExamListSection from "../ExamsHome/ExamListSection";
import CourseListSection from "../Academy/CourseListSection";
import CompetitionListSection from "./CompetitionListSection";
import TestimonialSection from "../Academy/TestimonialSection";
import PublicationListSection from "../Publications/PublicationListSection";
// interface and styles
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { CourseExamLeaguePublicationFunc } from "./interfaceType";

const CourseExamLeaguePublicationHome: CourseExamLeaguePublicationFunc = () => {
  const { pageData = null, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { plugins = null } = cachedData?.centre || {};
  console.log(plugins);

  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <CategoriesSection />
      <CourseListSection />
      <FutureSection />
      <ExamListSection />
      <PublicationListSection />
      <TestimonialSection />
      <CompetitionListSection />
      <PromoSection />
    </Box>
  );
};

export default CourseExamLeaguePublicationHome;
