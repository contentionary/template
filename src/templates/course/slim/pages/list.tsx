import React from "react";
import CoursesPage from "@src/components/Courses";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";

const Courses = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <AcademyWrapper
      title={`${name} Online Courses`}
      description={`${name} academy online courses and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <CoursesPage />
    </AcademyWrapper>
  );
};

export default Courses;
