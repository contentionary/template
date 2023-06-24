import Wallet from "@src/components/wallet";
import PortfolioWrapper from "@src/components/Layout/Wrapper/PortfolioWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const WalletPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <PortfolioWrapper
      title="wallet"
      description={`Welcome to ${name} online book store`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Wallet />
    </PortfolioWrapper>
  );
};

export default WalletPage;
