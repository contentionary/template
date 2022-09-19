import { useContext, useState } from "react";
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
import { useTheme } from "@mui/material/styles";
// styles, interface and config
import config from "@src/utils/config";
import useGlobalStyle from "@src/styles";
import { CourseInt } from "@src/utils/interface";
// app components
import VideoModal from "@src/components/shared/video";
import ImageButton from "@src/components/shared/buttons/ImageButton";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { CourseDetailsContext } from "@src/pages/courses/[slug]/[courseId]";

const HeroSection = () => {
  const courseDetails = useContext(CourseDetailsContext) as CourseInt;
  const theme = useTheme();
  const [openVideo, setOpenVideo] = useState(false);
  const globalStyle = useGlobalStyle();
  //
  const handleOpenVideo = () => setOpenVideo(true);

  if (!courseDetails) return <h1>Course not found</h1>;
  const {
    name,
    description,
    learnings,
    id,
    contents,
    imageUrl,
    price,
    subscriberCount,
  } = courseDetails;

  return (
    <>
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
                  width: "100%",
                  borderRadius: 2,
                  padding: { xs: 2, sm: 3 },
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <ImageButton
                  priority
                  onClick={handleOpenVideo}
                  src={imageUrl}
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
                {name}
              </Typography>
              <Typography variant="h6" mb={3}>
                Indorama Centre
              </Typography>
              <Typography mb={0} paragraph>
                <Typography variant="h6" component="span" color="primary">
                  Course ID
                </Typography>{" "}
                {id}
              </Typography>
              <Typography
                mb={3}
                variant="h6"
                display="flex"
                alignItems="center"
              >
                <PeopleOutlineOutlinedIcon color="primary" /> {subscriberCount}{" "}
                Students
              </Typography>
              <Typography variant="h2" component="h1">
                ₦{price}
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
    </>
  );
};
export default HeroSection;
