import React from "react";
import ExamAndPublicationFooter from "../Footer/ExamAndPublicationFooter";
import ExamAndPublicationHeader from "../Header/ExamAndPublicationHeader";
import HeadPage from "../PageHead";
import { WrapperFunc } from "./interface";

const ExamAndCourseWrapper: WrapperFunc = ({
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
      {showHeader && <ExamAndPublicationHeader />}
      {children}
      {showFooter && <ExamAndPublicationFooter />}
    </>
  );
};

export default ExamAndCourseWrapper;
