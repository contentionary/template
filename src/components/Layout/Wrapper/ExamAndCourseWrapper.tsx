import React from "react";
import ExamAndCourseFooter from "../Footer/ExamAndCourseFooter";
import ExamAndCourseHeader from "../Header/ExamAndCourseHeader";
import HeadPage from "../../PageHead";
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
      {showHeader && <ExamAndCourseHeader />}
      {children}
      {showFooter && <ExamAndCourseFooter />}
    </>
  );
};

export default ExamAndCourseWrapper;
