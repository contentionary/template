import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
//
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
// styles and components
import useGlobalStyle from "@src/styles";
// icons
import UserAddIcon from "@src/assets/icons/user-add.svg";
import StatusIcon from "@src/assets/icons/status.svg";
// interface and config
import config from "@src/utils/config";
import { HomePageFunc } from "./interfaceType";

const StepSection: HomePageFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ py: 8, px: { md: 6 } }} className="">
        <Container maxWidth="xl">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid
              item
              md={6}
              xs={12}
              order={{ xs: 2, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <Box
                sx={{
                  p: { xs: 2 },
                  borderRadius: 2,
                  bgcolor: "#F8E4D3",
                  position: "relative",
                  width: { xs: "100%", md: "70%" },
                  height: { xs: "100%", md: "60%" },
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    zIndex: 1,
                    width: 180,
                    left: "1.25rem",
                    bottom: "1.25rem",
                    position: "absolute",
                  }}
                  className="right"
                >
                  <Stack
                    mb={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Typography variant="h6" component="h5">
                      Total Users
                    </Typography>
                    <StatusIcon />
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                      }}
                    >
                      <UserAddIcon fill="white" />
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h5"
                      color="secondary.light"
                    >
                      12,000
                    </Typography>
                  </Stack>
                </Paper>
                <Image
                  width="100%"
                  height="90%"
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/step-img.png"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="h3"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h2"
              >
                Get Started in Three Simple Steps
              </Typography>
              <div className="">
                <Timeline className={globalStyle.stepsTimeline}>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot>01</TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6">
                        Create your free account
                      </Typography>
                      <Typography mb={3} paragraph>
                        Sign up for an account with your name, email and phone
                        number.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot>02</TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6">
                        Create a Centre or multiple centres
                      </Typography>
                      <Typography mb={3} paragraph>
                        Create as many centres you need to keep your work
                        organized.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot>03</TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6">
                        Select a theme, choose desired apps (features) and enjoy
                      </Typography>
                      <Typography mb={3} paragraph>
                        Pick from our library of themes and featured apps to get
                        your centre up and running.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </div>
              <NextLink href={`${config.URL.WEB}create-account`} passHref>
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  className={globalStyle.bgGradient}
                  sx={{
                    textAlign: "center",
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                >
                  Get Started for Free
                </Button>
              </NextLink>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default StepSection;
