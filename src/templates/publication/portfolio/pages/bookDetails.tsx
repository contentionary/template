import BookDetails from "@src/components/BookDetails";
import PortfolioWrapper from "@src/components/Layout/Wrapper/PortfolioWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const BookDetailsPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const publication = pageData.publication as PublicationInt;

  return (
    <PortfolioWrapper
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
    </PortfolioWrapper>
  );
};

export default BookDetailsPage;
