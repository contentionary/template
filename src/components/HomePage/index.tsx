import useGlobalStyle from "../../styles";

export default function HomePage() {
  const globalStyle = useGlobalStyle();
  return <div className={globalStyle.bgPrimary}>Home page</div>;
}
