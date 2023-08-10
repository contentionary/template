import LeagueDetailsPage from "@src/template/components/LeagueDetails";
import CourseExamLeaguePublicationWrapper from "@src/template/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const LeagueDetails = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <CourseExamLeaguePublicationWrapper
      title={pageData.leagueDetails?.name || ""}
      description={pageData.leagueDetails?.description || "league"}
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <LeagueDetailsPage />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default LeagueDetails;
