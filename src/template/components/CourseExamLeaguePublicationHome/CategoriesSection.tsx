import React, { Fragment } from "react";
// next
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import ImageLink from "@src/template/components/shared/buttons/ImageLink";
// interface and styles
import useGlobalStyle from "@src/template/styles";
import { CourseExamLeaguePublicationFunc } from "./interfaceType";
// icons
import BookIcon from "@src/template/assets/icons/book.svg";

const CategoriesSection: CourseExamLeaguePublicationFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        id="hero-section"
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Typography mb={4} variant="h4" component="h2">
            Available Categories
          </Typography>
          <Grid
            container
            wrap="nowrap"
            className={globalStyle.hiddenScrollbar}
            sx={{ overflowX: "auto", scrollSnapType: "x mandatory" }}
            spacing={{ xs: 2, sm: 3, lg: 4 }}
          >
            <Grid
              item
              xs={6}
              md={3}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ImageLink
                href="/courses"
                src="/images/courses-3.png"
                alt="Courses list page image"
              >
                <Typography component="h5" variant="h5" color="inherit">
                  <BookIcon className="MuiSvgFlip-root" fill="white" />
                  Course
                </Typography>
              </ImageLink>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ImageLink
                href="/library"
                src="/images/books.png"
                alt="Books list page"
              >
                <Typography component="h5" variant="h5" color="inherit">
                  <BookIcon className="MuiSvgFlip-root" fill="white" />
                  Books
                </Typography>
              </ImageLink>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ImageLink
                href="/exams"
                src="/images/exam-img.jpg"
                alt="Exams list page image"
              >
                <Typography component="h5" variant="h5" color="inherit">
                  <BookIcon className="MuiSvgFlip-root" fill="white" />
                  Exams
                </Typography>
              </ImageLink>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ImageLink
                href="/leagues"
                src="/images/hackathon.jpg"
                alt="Leagues list page image"
              >
                <Typography component="h5" variant="h5" color="inherit">
                  <BookIcon className="MuiSvgFlip-root" fill="white" />
                  Leagues
                </Typography>
              </ImageLink>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default CategoriesSection;
