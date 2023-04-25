import React from "react";
import MyExamsPage from "@src/components/Exams/MyExams";
import ExamAndPublicationsWrapper from "@src/components/Wrapper/ExamAndPublicationWrapper";

const MyExams = () => {
  return (
    <ExamAndPublicationsWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <MyExamsPage />
    </ExamAndPublicationsWrapper>
  );
};

export default MyExams;
