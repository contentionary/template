import Publications from "@src/components/Publications";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";

const PublicationsPage = () => {
  return (
    <PublicationsWrapper
      title="Contentionary | Publications"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <Publications />
    </PublicationsWrapper>
  );
};

export default PublicationsPage;
