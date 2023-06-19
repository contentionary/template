import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamAndLeagueHomePage from "@src/components/ExamAndLeague";
import ExamAndLeagueWrapper from "@src/components/Layout/Wrapper/ExamAndLeagueWrapper";

const LeaguePage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndLeagueWrapper
      title={`${name} Academy`}
      description={`Welcome to ${name} online League`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamAndLeagueHomePage />
    </ExamAndLeagueWrapper>
  );
};

export default LeaguePage;
