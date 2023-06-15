import React from "react";
import CourseExamLeaguePublicationFooter from "../Footer/CourseExamLeaguePublicationFooter";
import CourseExamLeaguePublicationHeader from "../Header/CourseExamLeaguePublicationHeader";
import HeadPage from "../PageHead";
import { WrapperFunc } from "./interface";

const CourseExamLeaguePublicationWrapper: WrapperFunc = ({
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
      {showHeader && <CourseExamLeaguePublicationHeader />}
      {children}
      {showFooter && <CourseExamLeaguePublicationFooter />}
    </>
  );
};

export default CourseExamLeaguePublicationWrapper;
