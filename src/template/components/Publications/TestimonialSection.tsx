import React, { Fragment } from "react";
// next
import Image from "@src/template/components/shared/image";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// app components and icon
// import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
// import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// styles and interface
import useGlobalStyle, { bg } from "@src/template/styles";
import { PublicationsFunc } from "./interfaceType";
//

const TestimonialSection: PublicationsFunc = () => {
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
                      Reader
                    </Typography>{" "}
                  </Typography>
                </Grid>
                {/* <Grid item xs={4} md={12}>
                  <IconButton color="primary">
                    <ArrowBackIosOutlinedIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <ArrowForwardIosOutlinedIcon />
                  </IconButton>
                </Grid> */}
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
                        objectFit="contain"
                        objectPosition="center"
                        src="/images/nounImage/mission.png"
                      />
                    </Avatar>
                    <Typography variant="h5"> Our Mission</Typography>
                  </Stack>
                  <Typography paragraph>
                    To deliver innovative learning solutions that improve
                    learning outcomes.
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
                        src="/images/nounImage/Modular-Learning.png"
                      />
                    </Avatar>
                    <Typography variant="h5">Modular Learning </Typography>
                  </Stack>
                  <Typography paragraph>
                    We have divided our content into small modules to provide a
                    simpler and more manageable learning experience.
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
                        src="/images/nounImage/Guided-Assessments.png"
                      />
                    </Avatar>
                    <Typography variant="h5">Guided Assessments</Typography>
                  </Stack>
                  <Typography paragraph>
                    Assigning projects to students during and after learning
                    helps evaluate their comprehension of the course prior to
                    certification.
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
