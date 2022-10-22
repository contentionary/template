import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link as MuiLink } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
// app components
import ImageComponent from "@src/components/shared/image";
// icons and resources
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// styles, interface and config
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { PublicationsFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";
import { cache, isServerSide, queryClient } from "@src/utils";
import ConfirmPayment from "@src/components/payment/confirmPayment";
import { useRouter } from "next/router";

const HeroSection: PublicationsFunc = () => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();
  const router = useRouter();
  const { reference, verifyValue, price: deductedPrice } = router.query;
  const { pageData = null, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { user, centre } = cachedData;
  const { landingPageSectionOne = null } =
    pageData?.templateData?.templateDetails || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const isCentreSubscriber = !isServerSide
    ? cache.get("isCentreSubscriber")
    : false;

  const getStarted = {
    link: "/library",
    text: isCentreSubscriber ? "Browse Books" : "Get started",
  };

  if (!isCentreSubscriber && centre.subscriptionModel === "SUBSCRIPTION") {
    const paymentLink = user
      ? `
    /payment?itemId=${centre.id}&purpose=CENTRE_SUBSCRIPTION&paymentMethod=CARD&amount=${centre.price}&currency=NGN&redirectUrl=${redirectUrl}`
      : "/login";
    getStarted.link = paymentLink;
    getStarted.text = `Get started for ₦${centre.price} Monthly`;
  }

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography
                mb={3}
                variant="h1"
                className={globalStyle.textGradient}
              >
                {landingPageSectionOne.title}
              </Typography>
              <Typography
                mb={3}
                paragraph
                fontSize={25}
                color="GrayText"
                lineHeight={1.3}
                maxWidth="450px"
              >
                {landingPageSectionOne.description}
              </Typography>
              <NextLink href={getStarted.link} passHref>
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  className={globalStyle.bgGradient}
                >
                  {getStarted.text}
                </Button>
              </NextLink>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 3, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                className={cardStyle.breathCard}
              >
                <Paper
                  sx={{ maxWidth: 150, borderRadius: "20px !important" }}
                  className="left"
                >
                  <Typography variant="subtitle2">
                    Access the best anywhere and anytime
                  </Typography>
                  <Box maxWidth={120} mx="auto" mt={2}>
                    <AvatarGroup max={3} total={100}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Avatar
                          key={`${index}-avatar`}
                          sx={{
                            bgcolor: "#FBEEE6",
                          }}
                        >
                          <PersonOutlineOutlinedIcon color="primary" />
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Paper>
                <Paper
                  sx={{ maxWidth: 140, top: "75% !important" }}
                  className="right"
                >
                  <Avatar
                    sx={{
                      mx: "auto",
                      bgcolor: "#FBEEE6",
                    }}
                  >
                    <AutoStoriesOutlinedIcon color="primary" />
                  </Avatar>
                  <Typography variant="subtitle2">
                    Compatible on all devices
                  </Typography>
                </Paper>
                <Box
                  className="breath-img-container"
                  sx={{
                    width: "70% !important",
                    borderRadius: "1.5rem !important",
                  }}
                >
                  <ImageComponent
                    priority
                    layout="fill"
                    alt="yes we can"
                    objectFit="cover"
                    objectPosition="center"
                    src={landingPageSectionOne.imageUrl}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {verifyValue && (
        <ConfirmPayment
          price={Number(deductedPrice)}
          reference={reference}
          redirectUrl={redirectUrl}
        />
      )}
    </Fragment>
  );
};
export default HeroSection;
