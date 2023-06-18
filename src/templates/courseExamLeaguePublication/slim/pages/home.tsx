import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import CourseExamLeaguePublicationWrapper from "@src/components/Wrapper/CourseExamLeaguePublicationWrapper";
import CourseExamLeaguePublicationHomePage from "@src/components/CourseExamLeaguePublicationHome";

const LeaguePage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <CourseExamLeaguePublicationWrapper
      title={`${name} Academy`}
      description={`Welcome to ${name}`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <CourseExamLeaguePublicationHomePage />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default LeaguePage;
