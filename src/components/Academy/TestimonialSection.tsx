import React, { Fragment } from "react";
// next
import Image from "@src/components/shared/image";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// styles and interface
import useGlobalStyle, { bg } from "@src/styles";
//

const TestimonialSection = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 12 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Typography mb={4} textAlign="center" variant="h4" component="h2">
            Why Us?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={12}>
                  <Typography mb={2} variant="h3" component="h2">
                    What you need to know as our{" "}
                    <Typography
                      variant="h3"
                      component="span"
                      color="primary.main"
                      fontWeight={"inherit"}
                      sx={{ ...bg().underlinedCurve }}
                    >
                      Students
                    </Typography>{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid
                container
                wrap="nowrap"
                spacing={{ xs: 2, md: 4 }}
                className={globalStyle.hiddenScrollbar}
                sx={{ overflowX: "auto", scrollSnapType: "x mandatory" }}
              >
                <Grid item xs={8} md={5} xl={4} flexShrink={0}>
                  <Stack mb={2} direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 56, height: 56 }}>
                      <Image
                        layout="fill"
                        alt="yes we can"
                        objectFit="cover"
                        objectPosition="center"
                        src="/images/avatar.png"
                      />
                    </Avatar>
                    <Typography variant="h5">Quality Control</Typography>
                  </Stack>
                  <Typography paragraph>
                    Each Learning Content is of top quality and have been
                    reviewed by quality control experts.
                  </Typography>
                </Grid>
                <Grid item xs={8} md={5} xl={4} flexShrink={0}>
                  <Stack mb={2} direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 56, height: 56 }}>
                      <Image
                        layout="fill"
                        alt="yes we can"
                        objectFit="cover"
                        objectPosition="center"
                        src="/images/avatar.png"
                      />
                    </Avatar>
                    <Typography variant="h5">Modular Learning</Typography>
                  </Stack>
                  <Typography paragraph>
                    Contents are broken down into small versions called modules
                    for easy learning experience and each module have exercises
                    for the students.
                  </Typography>
                </Grid>
                <Grid item xs={8} md={5} xl={4} flexShrink={0}>
                  <Stack mb={2} direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 56, height: 56 }}>
                      <Image
                        layout="fill"
                        alt="yes we can"
                        objectFit="cover"
                        objectPosition="center"
                        src="/images/avatar.png"
                      />
                    </Avatar>
                    <Typography variant="h5">Real Life Projects</Typography>
                  </Stack>
                  <Typography paragraph>
                    Projects are assigned to students during and after learning
                    to ascertained their level of understanding of the course
                    before certifications.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default TestimonialSection;
