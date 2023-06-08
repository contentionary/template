import React from "react";
import LeaguesPage from "@src/components/Leagues/MyLeagues";
import ExamAndLeagueWrapper from "@src/components/Wrapper/ExamAndLeagueWrapper";

const MyLeagues = () => {
  return (
    <ExamAndLeagueWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <LeaguesPage />
    </ExamAndLeagueWrapper>
  );
};

export default MyLeagues;
