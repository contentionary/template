import React, { Fragment } from "react";
// next
import Image from "next/image";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
//
import useGlobalStyle from "@src/styles";
import useButtonStyle from "@src/styles/button";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
// interface
import { MarketPlaceFunc } from "./interfaceType";

const HeroSection: MarketPlaceFunc = () => {
  const buttonStyle = useButtonStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ pt: 4, pb: 8 }} className="hero-section">
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
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
            <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="h1"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h1"
              >
                The Foremost{" "}
                <Typography
                  variant="h1"
                  component="span"
                  fontWeight={"inherit"}
                  sx={{ whiteSpace: "nowrap" }}
                  className={globalStyle.textGradient}
                >
                  Preparatory
                </Typography>{" "}
                Marketplace
              </Typography>
              <Typography
                sx={{
                  maxWidth: "450px",
                  mb: 3,
                  textAlign: { xs: "center", sm: "left" },
                }}
                paragraph
              >
                Join a Centre and access prep contents and prep tests by
                verified instructors and examiners.
              </Typography>
              <Stack
                sx={{ mb: 2 }}
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                className=""
              >
                <OutlinedInput
                  size="small"
                  placeholder="search for preparatory content..."
                  sx={{
                    minWidth: { xs: "100%", sm: "320px" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                />
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  className={globalStyle.bgGradient}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                >
                  Search marketplace
                </Button>
              </Stack>
            </Grid>
            <Grid
              item
              md={5}
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
                  width: "100%",
                  minHeight: "auto",
                  position: "relative",
                  padding: { xs: 2, sm: 3, lg: 4 },
                }}
              >
                <ButtonBase focusRipple className={buttonStyle.imageButton}>
                  <Box
                    component="span"
                    className="MuiImageBase-root"
                    sx={{
                      backgroundImage: "url(/images/hero-img.png)",
                    }}
                  />
                  <Box component="span" className="MuiImageBackdrop-root" />
                  <Box component="span" className="MuiImageFlex-root">
                    <Typography component="h5" variant="h5" color="inherit">
                      <Avatar
                        sx={{
                          backgroundColor: "transparent",
                          border: "2px solid white",
                        }}
                      >
                        <PlayIcon className="MuiSvgFlip-root" fill="white" />
                      </Avatar>{" "}
                      Play Demo
                    </Typography>
                  </Box>
                </ButtonBase>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default HeroSection;
