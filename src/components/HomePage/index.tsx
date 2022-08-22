import useGlobalStyle from "@src/styles";
import { HomePageFunc } from "./interfaceType";

const HomePage: HomePageFunc = () => {
  const globalStyle = useGlobalStyle();
  return <div className={globalStyle.bgGradient}>Home page</div>;
};
export default HomePage;
