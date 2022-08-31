import React, { Fragment, useState } from "react";
// next
import Image from "next/image"; //
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
//
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
//
// import useGlobalStyle from "@src/styles";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
// interface
import { HomePageFunc } from "./interfaceType";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const testimonials = [
  {
    img: "/images/testimonials/ekpo ekpo.jpeg",
    name: "Mr. Ekpo Ekpo,",
    title: "Administrative Secretary.",
    address: "GRUEN International Schools, Elioparanwo, Port Harcourt.",
    testimony:
      "We used Contentionary during our First Term Examinations and it was successful. For the learners, it was an exciting new experience. For the teachers, it was a great relief from the stress of manually marking and grading learners' scripts.",
  },
  {
    img: "/images/testimonials/stephen nebechi.jpg",
    name: "Stephen Nebechi,",
    title: "Head, Research and Operations.",
    address: "Ace Coterie Consulting, Lagos State.",
    testimony:
      "Conducting exams on the Contentionary platform solved all our online exam needs. They have a very simple registration process, swiftly created exams, easy to upload,  easy-to-use and manage interface. The platform has simplified our examination process to a great extent.",
  },
  {
    img: "/images/testimonials/indo.png",
    name: "Onyebouha Eva,",
    title: "Manager, Human Resources.",
    address: "Indorama-Eleme Fertilizers and Chemicals Limited.",
    testimony:
      "Contentionary has revolutionized how to screen candidates. As a multinational company that needs the best to screen candidates for employment, Contentionary delivered far beyond expectations. Supervisors were able to monitor all exams in real time. Amazing team.",
  },
];

const TestimonialSection: HomePageFunc = () => {
  const theme = useTheme();
  // const globalStyle = useGlobalStyle();
  const [activeStep, setActiveStep] = useState(0);
  //
  const maxSteps = testimonials.length;
  //
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ py: 0, px: { md: 6 }, bgcolor: "secondary.dark" }}
        className=""
      >
        <Container maxWidth="xl">
          <Grid container spacing={0} sx={{ alignItems: "center" }}>
            <Grid item py={4} xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography
                mb={4}
                variant="h3"
                color="white"
                component="h2"
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                What our customers are saying
              </Typography>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {testimonials.map((step, index) => (
                  <Fragment key={index.toString()}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Fragment>
                        <Typography
                          mb={4}
                          paragraph
                          color={grey[400]}
                          sx={{ textAlign: { xs: "center", md: "left" } }}
                        >
                          {step.testimony}
                        </Typography>
                        <Typography
                          mb={0}
                          color="white"
                          variant="subtitle2"
                          sx={{ textAlign: { xs: "center", md: "left" } }}
                        >
                          {`${step.name}, ${step.title}`}
                        </Typography>
                        <Typography
                          mb={4}
                          gutterBottom
                          color="white"
                          display="block"
                          variant="caption"
                          sx={{ textAlign: { xs: "center", md: "left" } }}
                        >
                          {step.address}
                        </Typography>
                      </Fragment>
                    ) : null}
                  </Fragment>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                sx={{
                  px: 3,
                  justifyContent: { xs: "center", md: "start" },
                  bgcolor: "secondary.dark",
                  "& .MuiMobileStepper-dot:not(.MuiMobileStepper-dotActive)": {
                    bgcolor: "secondary.light",
                  },
                }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                backButton={""}
                nextButton={""}
              />
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "start",
                  "& .Mui-disabled.MuiButton-root": {
                    color: "secondary.light",
                  },
                  "& .MuiButton-root:not(.Mui-disabled)": {
                    color: "white",
                  },
                }}
              >
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? <EastIcon /> : <WestIcon />}
                </Button>
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  {theme.direction === "rtl" ? <WestIcon /> : <EastIcon />}
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              p={"0 !important"}
              md={6}
              xs={12}
              order={{ xs: 1, md: 2 }}
            >
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {testimonials.map((step, index) => (
                  <Fragment key={index.toString()}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Image
                        width="100%"
                        height="70%"
                        objectFit="cover"
                        layout="responsive"
                        alt={step.testimony}
                        src={step.img}
                      />
                    ) : null}
                  </Fragment>
                ))}
              </AutoPlaySwipeableViews>
              <Box
                sx={{
                  p: 0,
                  position: "relative",
                }}
              ></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default TestimonialSection;
