import LeagueDetailsPage from "@src/components/LeagueDetails";
import ExamAndLeagueWrapper from "@src/components/Wrapper/ExamAndLeagueWrapper";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const LeagueDetails = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <ExamAndLeagueWrapper
      title={pageData.leagueDetails?.name || ""}
      description={pageData.leagueDetails?.description || "league"}
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <LeagueDetailsPage />
    </ExamAndLeagueWrapper>
  );
};

export default LeagueDetails;
