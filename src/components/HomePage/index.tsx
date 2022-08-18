import useGlobalStyle from "../../styles";
import { HomePageFunc } from "./interfaceType";

const HomePage: HomePageFunc = () => {
  const globalStyle = useGlobalStyle();
  return <div className={globalStyle.bgPrimary}>Home page</div>;
};
export default HomePage;
