import React from "react";
import Settings from "@src/components/Settings";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamAndLeagueWrapper from "@src/components/Wrapper/ExamAndLeagueWrapper";

const SettingsPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndLeagueWrapper
      title="Profile Settings"
      description={`${name} academy online courses and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Settings />
    </ExamAndLeagueWrapper>
  );
};

export default SettingsPage;
