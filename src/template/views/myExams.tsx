import React from "react";
import MyExamsPage from "@src/components/Exams/MyExams";
import CourseExamLeaguePublicationWrapper from "@src/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";

const MyExams = () => {
  return (
    <CourseExamLeaguePublicationWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <MyExamsPage />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default MyExams;
