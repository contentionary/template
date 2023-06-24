import Settings from "@src/components/Settings";
import PortfolioWrapper from "@src/components/Layout/Wrapper/PortfolioWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const SettingsPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <PortfolioWrapper
      title="Profile Settings"
      description={`Welcome to ${name} online book store`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Settings />
    </PortfolioWrapper>
  );
};

export default SettingsPage;
