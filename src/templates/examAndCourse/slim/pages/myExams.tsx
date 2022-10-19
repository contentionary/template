import React from "react";
import MyCoursesPage from "@src/components/Courses/MyCourses";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const MyExams = () => {
  return (
    <ExamAndCourseWrapper
      title="Contentionary"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <MyCoursesPage />
    </ExamAndCourseWrapper>
  );
};

export default MyExams;
