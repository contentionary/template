import Library from "@src/components/Library/MyPublications";
import CourseExamLeaguePublicationWrapper from "@src/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const MyPublicationPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;
  return (
    <CourseExamLeaguePublicationWrapper
      title={`${cachedData.user.firstname} ${name} books`}
      description={`${cachedData.user.firstname} ${name} books`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Library />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default MyPublicationPage;
