import React from "react";
import PortfolioFooter from "../Footer/PortfolioFooter";
import PortfolioHeader from "../Header/PortfolioHeader";
import HeadPage from "../../PageHead";
import { PortfolioWrapperFunc } from "./interface";

const PortfolioWrapper: PortfolioWrapperFunc = ({
  children,
  title,
  image,
  description,
  showFooter,
  showHeader,
}) => {
  return (
    <>
      <HeadPage title={title} image={image} description={description} />
      {showHeader && <PortfolioHeader />}
      {children}
      {showFooter && <PortfolioFooter />}
    </>
  );
};

export default PortfolioWrapper;
