import React from "react";
import CoursesPage from "@src/components/Courses/MyCourses";
import AcademyWrapper from "@src/components/Layout/Wrapper/AcademyWrapper";

const MyCourses = () => {
  return (
    <AcademyWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CoursesPage />
    </AcademyWrapper>
  );
};

export default MyCourses;
