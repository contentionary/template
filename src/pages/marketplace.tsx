import type { NextPage } from "next";
import MarketPlace from "@src/components/MarketPlace";
import Wrapper from "@src/components/Wrapper";
const MarketPlacePage: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <MarketPlace />
    </Wrapper>
  );
};

export default MarketPlacePage;
