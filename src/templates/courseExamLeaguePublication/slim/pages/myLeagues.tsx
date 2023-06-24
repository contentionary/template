import React from "react";
import LeaguesPage from "@src/components/Leagues/MyLeagues";
import CourseExamLeaguePublicationWrapper from "@src/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";

const MyLeagues = () => {
  return (
    <CourseExamLeaguePublicationWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <LeaguesPage />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default MyLeagues;
