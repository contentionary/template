import React from "react";
import CoursesPage from "@src/template/components/Courses/MyCourses";
import CourseExamLeaguePublicationWrapper from "@src/template/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";

const MyCourses = () => {
  return (
    <CourseExamLeaguePublicationWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CoursesPage />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default MyCourses;
