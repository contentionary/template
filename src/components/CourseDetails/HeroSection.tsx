import { useState } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
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
import useGlobalStyle from "@src/styles";
import { BasePageProps, CourseInt } from "@src/utils/interface";
// app components
import VideoModal from "@src/components/shared/video";
import ImageButton from "@src/components/shared/buttons/ImageButton";
import { useDialog } from "@src/hooks";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { queryClient } from "@src/utils";
import { isServerSide } from "@src/utils";
import ConfirmPayment from "@src/components/payment/confirmPayment";
import ShareContentOnMedia from "@src/components/shared/shareContentOnMedia/share";

const HeroSection = () => {
  const router = useRouter();
  const { reference, verifyValue, price: deductedPrice } = router.query;
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courseDetails = pageData.courseDetails as CourseInt;
  const auth = pageData?.auth;
  const theme = useTheme();
  const [openVideo, setOpenVideo] = useState(false);
  const globalStyle = useGlobalStyle();

  const handleOpenVideo = () => setOpenVideo(true);
  const {
    name,
    id,
    imageUrl,
    previewVideoUrl,
    price,
    subscriberCount,
    slug,
    summary,
  } = courseDetails;
  const { isCentreManager = false, isCourseSubscriber = false } = auth || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const paymentLink = `/payment?itemId=${id}&purpose=COURSE_SUBSCRIPTION&paymentMethod=CARD&amount=${price}&currency=NGN&redirectUrl=${redirectUrl}&verifyValue=${price}`;

  let Action = {
    link: `/courses/${slug}/${id}/contents/${id}`,
    text: "CONTINUE COURSE",
  };

  if (!isCourseSubscriber || !isCentreManager) {
    Action.text = "SUBSCRIBE";
    Action.link = paymentLink;
  }

  if (!auth) Action.link = "/login";

  return (
    <>
      <Box
        bgcolor="#FFFCF8"
        component="section"
        className="hero-section"
        sx={{ pt: 4, pb: 8, px: { md: 6 } }}
      >
        {verifyValue && (
          <ConfirmPayment
            price={Number(deductedPrice)}
            reference={reference}
            redirectUrl={redirectUrl}
          />
        )}
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
                  alt={`${name} preview video`}
                >
                  {previewVideoUrl ? (
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
                  ) : (
                    <span></span>
                  )}
                </ImageButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Typography variant="h2" component="h1">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="GrayText" mb={3}>
                {summary}
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
                <NextLink href={Action.link} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    className={globalStyle.bgGradient}
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    {Action.text}
                  </Button>
                </NextLink>
                <Button onClick={() => openDialog()}>
                  <Avatar variant="rounded" className={globalStyle.bgGradient}>
                    <ShareOutlinedIcon htmlColor="white" />
                  </Avatar>{" "}
                  <span>&nbsp; Share this course</span>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {previewVideoUrl && (
        <VideoModal
          src={previewVideoUrl}
          isOpen={openVideo}
          setIsOpen={setOpenVideo}
        />
      )}

      <ShareContentOnMedia isOpen={isOpen} closeDialog={closeDialog} />
    </>
  );
};
export default HeroSection;
