import React from "react";
import MyExamsPage from "@src/components/Exams/MyExams";
import ExamAndLeagueWrapper from "@src/components/Wrapper/ExamAndLeagueWrapper";

const MyExams = () => {
  return (
    <ExamAndLeagueWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <MyExamsPage />
    </ExamAndLeagueWrapper>
  );
};

export default MyExams;
