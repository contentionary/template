import React, { Fragment } from "react";
// next
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// styles, interface and config
import config from "@src/utils/config";
import useGlobalStyle from "@src/styles";
import { CourseDetailsPageFunc } from "./interfaceType";
// app components
import VideoModal from "@src/components/shared/video";
import ImageButton from "@src/components/shared/buttons/ImageButton";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const HeroSection: CourseDetailsPageFunc = () => {
  // const theme = useTheme();
  const [openVideo, setOpenVideo] = React.useState(false);
  const globalStyle = useGlobalStyle();
  //
  const handleOpenVideo = () => setOpenVideo(true);

  return (
    <Fragment>
      <Box
        bgcolor="#FFFCF8"
        component="section"
        className="hero-section"
        sx={{ pt: 4, pb: 8, px: { md: 6 } }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
              }}
            >
              <Box
                bgcolor="white"
                sx={{
                  border: "1px solid #E8E8E8",
                  width: "100%",
                  padding: { xs: 2, sm: 3 },
                }}
              >
                <ImageButton
                  priority
                  onClick={handleOpenVideo}
                  src="/images/hero-img.png"
                  alt="contentionary introduction video"
                >
                  <Typography component="h5" variant="h5" color="inherit">
                    <Avatar
                      sx={{
                        border: "2px solid white",
                        backgroundColor: "transparent",
                      }}
                    >
                      <PlayIcon className="MuiSvgFlip-root" fill="white" />
                    </Avatar>
                  </Typography>
                </ImageButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Typography variant="h2" component="h1">
                We Offer International Certifications
              </Typography>
              <Typography variant="h6" mb={3}>
                Indorama Centre
              </Typography>
              <Typography mb={0} paragraph>
                <Typography variant="h6" component="span" color="primary">
                  Course ID
                </Typography>{" "}
                bfd6bb40-124f-11ec-a161-bdf69d9cefd9
              </Typography>
              <Typography
                mb={3}
                variant="h6"
                display="flex"
                alignItems="center"
              >
                <PeopleOutlineOutlinedIcon color="primary" /> 1.5k Students
              </Typography>
              <Typography variant="h2" component="h1">
                #30,000
              </Typography>
              <Stack mt={1} spacing={2} direction="row" alignItems="center">
                <NextLink href={`${config.URL.WEB}create-account`} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    className={globalStyle.bgGradient}
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    ENROLL NOW
                  </Button>
                </NextLink>
                <NextLink href={`${config.URL.WEB}create-account`} passHref>
                  <MuiLink
                    gap={2}
                    color="inherit"
                    underline="none"
                    alignItems="center"
                    display={{ xs: "flex", sm: "inline-flex" }}
                  >
                    <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
                      <ShareOutlinedIcon htmlColor="white" />
                    </Avatar>{" "}
                    Share this course
                  </MuiLink>
                </NextLink>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <VideoModal isOpen={openVideo} setIsOpen={setOpenVideo} />
    </Fragment>
  );
};
export default HeroSection;
