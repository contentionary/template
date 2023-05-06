import React, { Fragment } from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import { Link as MuiLink } from "@mui/material";
// app components
import ImageLink from "@src/components/shared/buttons/ImageLink";
// styles and interface
import useGlobalStyle from "@src/styles";

const PracticeTestSection = () => {
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
            Top Practice Test
          </Typography>
          <Grid
            container
            columns={14}
            wrap="nowrap"
            spacing={{ xs: 2, sm: 3, lg: 4 }}
            className={globalStyle.hiddenScrollbar}
            sx={{ overflowX: "auto", scrollSnapType: "x mandatory" }}
          >
            {Array.from({ length: 2 }).map((_, index) => (
              <Fragment key={`${index}-test-card`}>
                <Grid
                  item
                  md={3}
                  sm={4}
                  xs={5}
                  sx={{
                    flexGrow: 1,
                    minWidth: "fit-content",
                    scrollSnapAlign: "start",
                  }}
                >
                  <ImageLink
                    href="/"
                    alt="Exams image link"
                    src="/images/nature-img.png"
                  >
                    <Typography maxWidth={160} variant="h5" color="inherit">
                      NATURE <br /> of Science
                    </Typography>
                  </ImageLink>
                </Grid>
                <Grid
                  item
                  md={3}
                  sm={4}
                  xs={5}
                  sx={{
                    flexGrow: 1,
                    minWidth: "fit-content",
                    scrollSnapAlign: "start",
                  }}
                >
                  <ImageLink
                    href="/"
                    alt="Exams image link"
                    src="/images/analytics-img.png"
                  >
                    <Typography maxWidth={160} variant="h5" color="inherit">
                      Data Analysis <br /> with Python
                    </Typography>
                  </ImageLink>
                </Grid>
                <Grid
                  item
                  md={3}
                  sm={4}
                  xs={5}
                  sx={{
                    flexGrow: 1,
                    minWidth: "fit-content",
                    scrollSnapAlign: "start",
                  }}
                >
                  <ImageLink
                    href="/"
                    alt="Exams image link"
                    src="/images/wireframe-img.png"
                  >
                    <Typography maxWidth={160} variant="h5" color="inherit">
                      Advanced <br /> UX Designs
                    </Typography>
                  </ImageLink>
                </Grid>
                <Grid
                  item
                  md={3}
                  sm={4}
                  xs={5}
                  sx={{
                    flexGrow: 1,
                    minWidth: "fit-content",
                    scrollSnapAlign: "start",
                  }}
                >
                  <ImageLink
                    href="/"
                    alt="Exams image link"
                    src="/images/astro-report-img.png"
                  >
                    <Typography maxWidth={160} variant="h5" color="inherit">
                      2022 <br /> Astro Report
                    </Typography>
                  </ImageLink>
                </Grid>
                <Grid
                  item
                  md={3}
                  sm={4}
                  xs={5}
                  sx={{
                    flexGrow: 1,
                    minWidth: "fit-content",
                    scrollSnapAlign: "start",
                  }}
                >
                  <ImageLink
                    href="/"
                    alt="Exams image link"
                    src="/images/wireframe-img.png"
                  >
                    <Typography maxWidth={160} variant="h5" color="inherit">
                      Advanced <br /> UX Designs
                    </Typography>
                  </ImageLink>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default PracticeTestSection;
