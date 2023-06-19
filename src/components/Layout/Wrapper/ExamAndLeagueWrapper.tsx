import React from "react";
import ExamAndLeagueFooter from "../Footer/ExamAndLeagueFooter";
import ExamAndLeagueHeader from "../Header/ExamAndLeagueHeader";
import HeadPage from "../../PageHead";
import { WrapperFunc } from "./interface";

const ExamAndLeagueWrapper: WrapperFunc = ({
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
      {showHeader && <ExamAndLeagueHeader />}
      {children}
      {showFooter && <ExamAndLeagueFooter />}
    </>
  );
};

export default ExamAndLeagueWrapper;
