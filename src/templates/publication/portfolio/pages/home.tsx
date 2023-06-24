import Portfolio from "@src/components/Portfolio";
import PortfolioWrapper from "@src/components/Layout/Wrapper/PortfolioWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const PortfolioPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <PortfolioWrapper
      title={`${name} | Book Store`}
      description={`Welcome to ${name} online book store`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Portfolio />
    </PortfolioWrapper>
  );
};

export default PortfolioPage;
