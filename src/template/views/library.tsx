import Library from "@src/template/components/Library";
import CourseExamLeaguePublicationWrapper from "@src/template/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const LibraryPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;
  return (
    <CourseExamLeaguePublicationWrapper
      title={`${name} | Library Books & Publications`}
      description={`Access, Buy and subscribe to all ${name} books and publications`}
      image={logo}
      showHeader={true}
      showFooter={true}
    >
      <Library />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default LibraryPage;
