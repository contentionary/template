import BookDetails from "@src/components/BookDetails";
import CourseExamLeaguePublicationWrapper from "@src/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const BookDetailsPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const publication = pageData.publication as PublicationInt;

  return (
    <CourseExamLeaguePublicationWrapper
      title={`${name} | ${publication.name}`}
      description={publication.description}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <BookDetails
        centre={cachedData.centre}
        publication={publication}
        auth={pageData.auth}
      />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default BookDetailsPage;
