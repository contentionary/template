import type { NextPage } from "next";
import HomePage from "@src/components/HomePage";
import Wrapper from "@src/components/Wrapper";
const Home: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <HomePage />
    </Wrapper>
  );
};

export default Home;
