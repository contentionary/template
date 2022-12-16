import Wallet from "@src/components/wallet";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const WalletPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <PublicationsWrapper
      title="wallet"
      description={`Welcome to ${name} online book store`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Wallet />
    </PublicationsWrapper>
  );
};

export default WalletPage;
