import type { NextPage } from "next";
import Library from "@src/components/Library";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";

const LibraryPage: NextPage = () => {
  return (
    <PublicationsWrapper
      title="Contentionary | Publications"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <Library />
    </PublicationsWrapper>
  );
};

export default LibraryPage;
