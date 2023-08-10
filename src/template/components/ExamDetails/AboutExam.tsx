import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// icons
// interface and config
import { ExamDetailsPageFunc } from "./interfaceType";

const AboutExam: ExamDetailsPageFunc = ({ exam }) => {
  const { description } = exam;

  return (
    <Fragment>
      <Typography variant="h5" mb={2}>
        ABOUT THIS EXAM:
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: description }} />
    </Fragment>
  );
};

export default AboutExam;
