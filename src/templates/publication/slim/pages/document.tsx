import Document from "@src/components/Document";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";

const DocumentPage = () => {
  return (
    <PublicationsWrapper
      title="Contentionary | Publications"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <Document />
    </PublicationsWrapper>
  );
};

export default DocumentPage;
