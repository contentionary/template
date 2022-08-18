import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import HeadPage from "../PageHead";

interface Props {
  children: JSX.Element;
  title: string;
  description: string;
  showHeader?: boolean;
  showFooter?: boolean;
}
export default function Wrapper({
  children,
  title,
  description,
  showFooter,
  showHeader,
}: Props) {
  return (
    <>
      <HeadPage title={title} description={description} />
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
