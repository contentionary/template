import type { NextPage } from "next";
import HomePage from "@src/components/HomePage";
import Wrapper from "@src/components/Wrapper";
const Home: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <HomePage />
    </Wrapper>
  );
};

export default Home;
