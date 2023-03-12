import React from "react";
import CoursesPage from "@src/components/Courses/MyCourses";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const MyCourses = () => {
  return (
    <ExamAndCourseWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CoursesPage />
    </ExamAndCourseWrapper>
  );
};

export default MyCourses;
