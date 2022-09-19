import type { NextPage } from "next";
import BookDetails from "@src/components/BookDetails";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";

const BookDetailsPage: NextPage = () => {
  return (
    <PublicationsWrapper
      title="Contentionary | Publications"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <BookDetails />
    </PublicationsWrapper>
  );
};

export default BookDetailsPage;
