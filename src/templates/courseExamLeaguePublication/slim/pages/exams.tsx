import React from "react";
import ExamsPage from "@src/components/Exams";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import CourseExamLeaguePublicationWrapper from "@src/components/Wrapper/CourseExamLeaguePublicationWrapper";

const Exams = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <CourseExamLeaguePublicationWrapper
      title={`${name} Online Courses`}
      description={`${name} academy online courses and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamsPage />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default Exams;
