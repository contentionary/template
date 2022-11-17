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

const AboutExam: ExamDetailsPageFunc = ({ exam }) => {
  // const { description } = exam;

  return (
    <Fragment>
      <Stack>
        <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
          Top Participants:{" "}
        </Typography>
        <Grid container spacing={{ xs: 2, xl: 10 }}>
          <Grid item xs={12} md={4} xl={4} sx={{ mb: { xs: 3, md: 5 } }}>
            <Paper
              sx={{
                textAlign: "center",
                width: 200,
                height: 169,
                paddingX: 1,
                paddingY: 2,
              }}
            >
              <Typography color="primary" sx={{ mb: 2 }}>
                1st
              </Typography>
              <ImageComponent
                width="60px"
                height="60px"
                alt="Contentionary"
                src="/images/courses-4.png"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                Emmanuel Ifeanyi
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} xl={4} sx={{ mb: { xs: 3, md: 5 } }}>
            <Paper
              sx={{
                textAlign: "center",
                width: 200,
                height: 169,
                paddingX: 1,
                paddingY: 2,
              }}
            >
              <Typography color="primary" sx={{ mb: 2 }}>
                1st
              </Typography>
              <ImageComponent
                width="60px"
                height="60px"
                alt="Contentionary"
                src="/images/courses-4.png"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                Emmanuel Ifeanyi
              </Typography>
            </Paper>
          </Grid>{" "}
          <Grid
            item
            xs={12}
            md={4}
            xl={4}
            sx={{
              display: "flex",
              justifyContent: "end",
              mb: { xs: 3, md: 5 },
            }}
          >
            <Paper
              sx={{
                textAlign: "center",
                width: 200,
                height: 169,
                paddingX: 1,
                paddingY: 2,
              }}
            >
              <Typography color="primary" sx={{ mb: 2 }}>
                1st
              </Typography>
              <ImageComponent
                width="60px"
                height="60px"
                alt="Contentionary"
                src="/images/courses-4.png"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                Emmanuel Ifeanyi
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
      <Typography variant="h5" mb={2}>
        ABOUT THIS LEAGUE:
      </Typography>
      <Typography>
        ABOUT THIS LEAGUE: Much as the pandemic became intense, some schools
        already had all it takes to still continue their curriculum through
        adopted technologies.But in as much as the pandemic became intense, some
        schools. Much as the pandemic became intense, some schools already had
        all it takes to still continue their curriculum through adopted
        technologies.But in as much as the pandemic became intense, some
        schoolsMuch as the pandemic became intense, some schools already had all
        it takes to still continue their curriculum through adopted
        technologies.But in as much as the pandemic became intense, some
        schoolsMuch as the pandemic became intense, some schools already had all
        it takes to still continue their curriculum through adopted
        technologies.But in as much as the pandemic became intense, some schools
        Much as the pandemic became intense, some schools already had all it
        takes to still continue their curriculum through adopted
        technologies.But in as much as the pandemic became intense, some schools
      </Typography>
      {/* <Box dangerouslySetInnerHTML={{ __html: description }} /> */}
    </Fragment>
  );
};

export default AboutExam;
