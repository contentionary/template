import React, { Fragment } from "react";
// next
import Image from "next/image";
// import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
//
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
//
// import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
// interface
import { AcademyFunc } from "./interfaceType";

const CourseListSection: AcademyFunc = () => {
  const cardStyle = useCardStyle();
  // const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Typography
            mb={4}
            variant="h4"
            component="h2"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Explore{" "}
            <Typography
              variant="h4"
              component="span"
              color="primary.main"
              fontWeight={"inherit"}
            >
              Top Online
            </Typography>{" "}
            Courses From Highly Qualified Educators
          </Typography>
          <Grid
            container
            direction="row-reverse"
            mb={{ xs: 2, md: 3, lg: 2, xl: 4 }}
            spacing={{ xs: 2, md: 3, lg: 2, xl: 4 }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={`${index}-course-card`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Card className={cardStyle.courseCard}>
                  <CardActionArea className="MuiCourseCardActionBase-root">
                    <Image
                      src={`/images/courses-${index}.png`}
                      width="100%"
                      height="60%"
                      layout="responsive"
                      objectFit="cover"
                      alt="Contentionary"
                    />
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: "nowrap",
                          alignItems: "start",
                          justifyContent: "between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h5">
                          Learn Marketing from Top Instructors.
                        </Typography>
                        <Typography
                          paragraph
                          mb={0}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <StarBorderOutlinedIcon
                            color="primary"
                            fontSize="inherit"
                          />{" "}
                          4.5
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        Premium Centre gives you a vast categories by top
                        industry expert...
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: { xs: "wrap", md: "nowrap" },
                          alignItems: "center",
                          justifyContent: "between",
                        }}
                      >
                        <Typography
                          paragraph
                          mb={0}
                          sx={{ order: { xs: 2, md: 2 } }}
                        >
                          4 weeks
                        </Typography>
                        <Typography
                          paragraph
                          mb={0}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            order: { xs: 3, md: 2 },
                          }}
                        >
                          <PeopleAltOutlinedIcon
                            color="primary"
                            fontSize="inherit"
                          />{" "}
                          1.5k Students
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          mb={0}
                          sx={{
                            ml: "auto",
                            flexGrow: 1,
                            order: { xs: 1, md: 3 },
                            width: { xs: "100%", md: "auto" },
                            textAlign: { xs: "left", md: "right" },
                          }}
                        >
                          35.5$
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={{ xs: 2, md: 3, lg: 2, xl: 4 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={`${index}-course-card`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Card className={cardStyle.courseCard}>
                  <CardActionArea className="MuiCourseCardActionBase-root">
                    <Image
                      src={`/images/courses-${index}.png`}
                      width="100%"
                      height="60%"
                      layout="responsive"
                      objectFit="cover"
                      alt="Contentionary"
                    />
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: "nowrap",
                          alignItems: "start",
                          justifyContent: "between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h5">
                          Learn Marketing from Top Instructors.
                        </Typography>
                        <Typography
                          paragraph
                          mb={0}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <StarBorderOutlinedIcon
                            color="primary"
                            fontSize="inherit"
                          />{" "}
                          4.5
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        Premium Centre gives you a vast categories by top
                        industry expert...
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: { xs: "wrap", md: "nowrap" },
                          alignItems: "center",
                          justifyContent: "between",
                        }}
                      >
                        <Typography
                          paragraph
                          mb={0}
                          sx={{ order: { xs: 2, md: 2 } }}
                        >
                          4 weeks
                        </Typography>
                        <Typography
                          paragraph
                          mb={0}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            order: { xs: 3, md: 2 },
                          }}
                        >
                          <PeopleAltOutlinedIcon
                            color="primary"
                            fontSize="inherit"
                          />{" "}
                          1.5k Students
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          mb={0}
                          sx={{
                            ml: "auto",
                            flexGrow: 1,
                            order: { xs: 1, md: 3 },
                            width: { xs: "100%", md: "auto" },
                            textAlign: { xs: "left", md: "right" },
                          }}
                        >
                          35.5$
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};

export default CourseListSection;
