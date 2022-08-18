import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import HeadPage from "../PageHead";
import { WrapperFunc } from "./interface";

const Wrapper: WrapperFunc = ({
  children,
  title,
  description,
  showFooter,
  showHeader,
}) => {
  return (
    <>
      <HeadPage title={title} description={description} />
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Wrapper;
