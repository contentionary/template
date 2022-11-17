import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// icons
// interface and config
import { ExamDetailsPageFunc } from "./interfaceType";
import ImageComponent from "@src/components/shared/image";

const AboutExam: ExamDetailsPageFunc = () => {
  // const { description } = exam;

  return (
    <Fragment>
      <Stack>
        <Paper sx={{ padding: 3 }}>
          <Stack
            direction="row"
            spacing={{ md: 3 }}
            sx={{ alignItems: "center" }}
          >
            <Box sx={{ textAlign: "center" }}>
              <ImageComponent
                width="50px"
                height="50px"
                alt="Contentionary"
                src="/images/courses-4.png"
                style={{ borderRadius: "50%" }}
              />
              <Typography>4 days ago</Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 1 }}>
              <span style={{ color: "#F77E23" }}>Emmanuel Ifeanyi</span> took
              part in <strong>Mathematics</strong> One examination by
              <strong>12:31 PM 2021-10-25</strong> and scored <strong>4</strong>{" "}
              within <strong>40 : 55</strong>
              (time in minitues).
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Fragment>
  );
};

export default AboutExam;
