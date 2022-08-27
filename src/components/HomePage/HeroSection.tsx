import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Hidden from "@mui/material/Hidden";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
//
import useGlobalStyle from "@src/styles";
import { useTheme } from "@mui/material/styles";
import { blueGrey, grey, indigo } from "@mui/material/colors";
// interface
import { HomePageFunc } from "./interfaceType";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import SimcardIcon from "@src/assets/icons/simcard.svg";
import CardRemoveIcon from "@src/assets/icons/card-remove.svg";
import UserAddIcon from "@src/assets/icons/user-circle-add.svg";

const HeroSection: HomePageFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ pt: 4, pb: 8 }} className="hero-section">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              order={{ xs: 2, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "end", md: "center" },
              }}
            >
              <Image
                width={40}
                height={40}
                src="/images/bg-artifacts/burst-bloat.png"
                objectFit="cover"
                alt="Contentionary"
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="h2"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h1"
              >
                Seamlessly create your{" "}
                <Typography
                  variant="h2"
                  component="span"
                  fontWeight={"inherit"}
                  sx={{ whiteSpace: "nowrap" }}
                  className={globalStyle.textGradient}
                >
                  Online Academy
                </Typography>{" "}
                in minutes
              </Typography>
              <Typography
                sx={{
                  maxWidth: "450px",
                  mb: 3,
                  textAlign: { xs: "center", sm: "left" },
                }}
                paragraph
              >
                Share, Sell, Engage and Impact your students or subscribers on
                your terms.
              </Typography>
              <Stack
                sx={{ mb: 2 }}
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                className=""
              >
                <NextLink href="/" passHref>
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

                <NextLink href="/" passHref>
                  <Button
                    size="large"
                    variant="outlined"
                    component={MuiLink}
                    sx={{
                      borderWidth: 2,
                      ":hover": {
                        borderWidth: 2,
                      },
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      width: { xs: "100%", sm: "42.24px" },
                      height: { xs: "100%", sm: "42.24px" },
                    }}
                  >
                    <Hidden smUp>Play Demo </Hidden> <PlayIcon />
                  </Button>
                </NextLink>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "start" },
                }}
                spacing={2}
                alignItems="center"
              >
                <Typography
                  paragraph
                  sx={{ mb: 0, display: { xs: "flex", alignItems: "center" } }}
                >
                  <SimcardIcon />
                  &nbsp;No code required
                </Typography>
                <Typography
                  paragraph
                  sx={{ mb: 0, display: { xs: "flex", alignItems: "center" } }}
                >
                  <UserAddIcon />
                  &nbsp;No technical skills needed
                </Typography>
                <Typography
                  paragraph
                  sx={{ mb: 0, display: { xs: "flex", alignItems: "center" } }}
                >
                  <CardRemoveIcon />
                  &nbsp;No credit card
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              order={{ xs: 3, md: 3 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
              }}
            >
              <Box
                className={globalStyle.bgArtifact}
                sx={{
                  p: 4,
                  width: "100%",
                  minHeight: "auto",
                  position: "relative",
                }}
              >
                <Image
                  width="80%"
                  height="60%"
                  src="/images/hero-img.png"
                  layout="responsive"
                  objectFit="cover"
                  alt="Contentionary"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default HeroSection;
