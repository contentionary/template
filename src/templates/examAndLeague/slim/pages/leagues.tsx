import React from "react";
import LeaguesPage from "@src/components/Leagues";
import ExamAndLeagueWrapper from "@src/components/Wrapper/ExamAndLeagueWrapper";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";

const Leagues = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndLeagueWrapper
      title={`${name} Online Leagues`}
      description={`${name} academy online leagues and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <LeaguesPage />
    </ExamAndLeagueWrapper>
  );
};

export default Leagues;
