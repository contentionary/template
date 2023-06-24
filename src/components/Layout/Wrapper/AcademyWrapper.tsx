import React from "react";
import AcademyFooter from "../Footer/AcademyFooter";
import AcademyHeader from "../Header/AcademyHeader";
import HeadPage from "../../PageHead";
import { AcademyWrapperFunc } from "./interface";

const AcademyWrapper: AcademyWrapperFunc = ({
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
      {showHeader && <AcademyHeader />}
      {children}
      {showFooter && <AcademyFooter />}
    </>
  );
};

export default AcademyWrapper;
