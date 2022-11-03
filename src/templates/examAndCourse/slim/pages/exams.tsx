import React from "react";
import ExamsPage from "@src/components/Exams";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const Exams = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndCourseWrapper
      title={`${name} Online Courses`}
      description={`${name} academy online courses and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamsPage />
    </ExamAndCourseWrapper>
  );
};

export default Exams;
