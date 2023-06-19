import PageError from "@src/components/shared/state/PageError";
import PublicationsWrapper from "@src/components/Layout/Wrapper/PublicationsWrapper";

const ErrorPage = () => {
  return (
    <PublicationsWrapper
      title="Edtify | Publications"
      description="Welcome to Edtify"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </PublicationsWrapper>
  );
};

export default ErrorPage;
