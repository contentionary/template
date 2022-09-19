import React, { Fragment } from "react";
// next
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import ImageLink from "@src/components/shared/buttons/ImageLink";
// interface and styles
import useGlobalStyle from "@src/styles";
import { AcademyFunc } from "./interfaceType";
// icons
import BookIcon from "@src/assets/icons/book.svg";

const CategoriesSection: AcademyFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
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
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ImageLink
                href="/courses"
                src="/images/courses-3.png"
                alt="contentionary introduction video"
              >
                <Typography component="h5" variant="h5" color="inherit">
                  <BookIcon className="MuiSvgFlip-root" fill="white" /> Courses
                </Typography>
              </ImageLink>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ImageLink
                href="/"
                src="/images/exam-img.jpg"
                alt="contentionary introduction video"
              >
                <Typography component="h5" variant="h5" color="inherit">
                  <BookIcon className="MuiSvgFlip-root" fill="white" />
                  Practice Test
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
