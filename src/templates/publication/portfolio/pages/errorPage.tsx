import PageError from "@src/components/shared/state/PageError";
import PortfolioWrapper from "@src/components/Layout/Wrapper/PortfolioWrapper";

const ErrorPage = () => {
  return (
    <PortfolioWrapper
      title="Edtify | Publications"
      description="Welcome to Edtify"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </PortfolioWrapper>
  );
};

export default ErrorPage;
