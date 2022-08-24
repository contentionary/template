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
      <Box component="section" sx={{ py: 8 }} className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={6}>
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
                      textAlign: "center",
                      width: { xs: "100%", sm: "40px" },
                      display: { xs: "block", sm: "inline-block" },
                    }}
                  >
                    <PlayIcon />
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
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  minHeight: "auto",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/hero-img.png"
                  width="80%"
                  height="60%"
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
