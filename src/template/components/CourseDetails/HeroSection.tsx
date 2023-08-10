import { useState } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// styles, interface and config
import { bg } from "@src/template/styles";
// app components
import VideoModal from "@src/template/components/shared/video";
import ImageButton from "@src/template/components/shared/buttons/ImageButton";
import { useDialog } from "@src/utils/hooks";
// icons
import PlayIcon from "@src/template/assets/icons/play.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ConfirmPayment from "@src/template/components/payment/confirmPayment";
import ShareContentOnMedia from "@src/template/components/shared/shareContentOnMedia/share";
import { CourseDetailsPageFunc } from "../../utils/interface";

const HeroSection: CourseDetailsPageFunc = ({
  courseDetails,
  action,
  subscriptionModel,
}) => {
  const router = useRouter();
  const { reference, price: deductedPrice, tx_ref } = router.query;
  const { isOpen, openDialog, closeDialog } = useDialog();
  const theme = useTheme();
  const [openVideo, setOpenVideo] = useState(false);
  const handleOpenVideo = () => setOpenVideo(true);

  const verifyValue = router.query.verifyValue === "true";

  const { name, imageUrl, previewVideoUrl, price, subscriberCount, summary } =
    courseDetails;

  return (
    <>
      <Box
        component="section"
        sx={{ pt: 4, pb: 8, px: { md: 6 }, ...bg().bgDustyPrimary }}
      >
        {verifyValue && (
          <ConfirmPayment
            price={Number(deductedPrice)}
            reference={reference || tx_ref}
            redirectUrl={action.redirectUrl}
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
                  padding: 0.5,
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
              {subscriptionModel === "SUBSCRIPTION" && <br />}
              {subscriptionModel != "SUBSCRIPTION" && (
                <Typography variant="h2" component="h1">
                  ₦{price}
                </Typography>
              )}
              <Stack mt={1} spacing={2} direction="row" alignItems="center">
                <NextLink href={action.link} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    color="primary"
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    {action.text}
                  </Button>
                </NextLink>
                <Button onClick={() => openDialog()}>
                  <Avatar variant="rounded" sx={{ ...bg().underlinedCurve }}>
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
