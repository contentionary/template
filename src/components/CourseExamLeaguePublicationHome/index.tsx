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
  const { plugins } = cachedData?.centre || {};

  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <CategoriesSection />
      {plugins.COURSE && <CourseListSection />}
      <FutureSection />
      {plugins.EXAM && <ExamListSection />}
      {plugins.PUBLICATION && <PublicationListSection />}
      <TestimonialSection />
      {plugins.LEAGUE && <CompetitionListSection />}
      <PromoSection />
    </Box>
  );
};

export default CourseExamLeaguePublicationHome;
