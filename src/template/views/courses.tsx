import React from "react";
//
import Courses from "@src/components/Courses";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import CourseExamLeaguePublicationWrapper from "@src/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";

const CoursesPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <CourseExamLeaguePublicationWrapper
      title={`${name} Ademola Online Courses`}
      description={`${name} academy online courses and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Courses />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default CoursesPage;
