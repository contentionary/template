import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// icons
// interface and config
import { ExamDetailsPageFunc } from "./interfaceType";
import ImageComponent from "@src/components/shared/image";
import ExamCard from "@src/components/shared/cards/ExamCard";

const AboutExam: ExamDetailsPageFunc = ({ exam }) => {
  // const { description } = exam;

  return (
    <Fragment>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid
          item
          xs={12}
          md={4}
          xl={4}
          sx={{ mb: { xs: 3, md: 5 } }}
          sx={{ mt: 4 }}
        >
          <ExamCard exam="y6tt" />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={4}
          sx={{ mb: { xs: 3, md: 5 } }}
          sx={{ mt: 4 }}
        >
          <ExamCard exam="y6tt" />
        </Grid>{" "}
        <Grid
          item
          xs={12}
          md={4}
          xl={4}
          sx={{ mb: { xs: 3, md: 5 } }}
          sx={{ mt: 4 }}
        >
          <ExamCard exam="y6tt" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AboutExam;
