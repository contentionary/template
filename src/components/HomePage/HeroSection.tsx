import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
//
// import { useTheme } from "@mui/material/styles";
//
import useGlobalStyle from "@src/styles";
// interface and config
import config from "@src/utils/config";
import { HomePageFunc } from "./interfaceType";
// app components
import VideoModal from "@src/components/shared/video";
import ImageButton from "@src/components/shared/buttons/ImageButton";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import SimcardIcon from "@src/assets/icons/simcard.svg";
import CardRemoveIcon from "@src/assets/icons/card-remove.svg";
import UserAddIcon from "@src/assets/icons/user-circle-add.svg";

const HeroSection: HomePageFunc = () => {
  // const theme = useTheme();
  const [openVideo, setOpenVideo] = React.useState(false);
  const globalStyle = useGlobalStyle();
  //
  const handleOpenVideo = () => setOpenVideo(true);

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, pb: 8, px: { md: 6 } }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
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
            <Grid item xs={12} md={6} lg={6} xl={6} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="h1"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h1"
              >
                Seamlessly create your{" "}
                <Typography
                  variant="h1"
                  component="span"
                  fontWeight={"inherit"}
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
                <Button
                  size="large"
                  variant="outlined"
                  onClick={handleOpenVideo}
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
                  <Hidden smUp>Play Demo &nbsp;</Hidden> <PlayIcon />
                </Button>
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
              xs={12}
              md={6}
              lg={5}
              xl={4}
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
                  padding: { xs: 2, sm: 3 },
                }}
              >
                <ImageButton
                  onClick={handleOpenVideo}
                  src="/images/hero-img.png"
                  alt="contentionary introduction video"
                >
                  <Typography component="h5" variant="h5" color="inherit">
                    <Avatar
                      sx={{
                        backgroundColor: "transparent",
                        border: "2px solid white",
                      }}
                    >
                      <PlayIcon className="MuiSvgFlip-root" fill="white" />
                    </Avatar>
                  </Typography>
                </ImageButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <VideoModal isOpen={openVideo} setIsOpen={setOpenVideo} />
    </Fragment>
  );
};
export default HeroSection;
