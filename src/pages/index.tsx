import type { NextPage } from "next";
import HomePage from "../components/HomePage";
import Wrapper from "../components/Wrapper";
const Home: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary"
      description="Welcome to contentionary"
      showHeader={true}
      showFooter={true}
    >
      <HomePage />
    </Wrapper>
  );
};

export default Home;
