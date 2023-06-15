import React, { Fragment, useEffect, useState } from "react";
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
// import { useTheme } from "@mui/material/styles";
// app components
import ImageComponent from "@src/components/shared/image";
// icons and resources
import { alpha, useTheme } from "@mui/material/styles";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// interface and styles
import { cache, isServerSide, queryClient } from "@src/utils";
import useCardStyle from "@src/styles/card";
import { ExamAndCourseFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import ConfirmPayment from "@src/components/payment/confirmPayment";

const HeroSection: ExamAndCourseFunc = () => {
  const theme = useTheme();
  const cardStyle = useCardStyle();
  const router = useRouter();
  const { reference, verifyValue, price: deductedPrice, tx_ref } = router.query;
  const { pageData = null, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { user, centre } = cachedData;
  const pricing = pageData?.templateData?.defaultPrice;
  const redirectUrl = !isServerSide ? window.location.href : "";
  const { landingPageSectionOne = null } =
    pageData?.templateData?.templateDetails || {};
  const isCentreSubscriber = !isServerSide
    ? cache.get("isCentreSubscriber")
    : false;
  const getStarted = {
    link: "/courses",
    text: isCentreSubscriber ? "Browse Courses" : "Get started",
  };
  if (!isCentreSubscriber) {
    const paymentLink = user
      ? `
    /payment?transactionkey=${uuid()}&itemId=${
          centre.id
        }&purpose=CENTRE_SUBSCRIPTION&paymentMethod=CARD&amount=${
          centre.price
        }&currency=NGN&redirectUrl=${redirectUrl}`
      : "/login";
    getStarted.link = paymentLink;
    getStarted.text =
      centre.subscriptionModel === "SUBSCRIPTION"
        ? `Get started for ${pricing ? pricing.symbol : "₦"}${
            pricing ? pricing.amount : centre.price
          }`
        : "Request Access";
  }
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
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
              <Typography mb={3} variant="h1" color="primary">
                {landingPageSectionOne?.title}
              </Typography>
              <Typography
                mb={3}
                paragraph
                fontSize={{ xs: 20, md: 30 }}
                color="GrayText"
                lineHeight={1.3}
                maxWidth="450px"
              >
                {landingPageSectionOne?.description}
              </Typography>
              {hydrated && (
                <NextLink href={getStarted.link} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    color="primary"
                  >
                    {getStarted.text}
                  </Button>
                </NextLink>
              )}
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
                            backgroundColor: alpha(
                              theme.palette.primary["main"],
                              0.1
                            ),
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
                      backgroundColor: alpha(
                        theme.palette.primary["main"],
                        0.1
                      ),
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
                    src={landingPageSectionOne?.imageUrl}
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
          reference={reference || tx_ref}
          redirectUrl={redirectUrl}
          purpose="CENTRE_SUBSCRIPTION"
        />
      )}
    </Fragment>
  );
};
export default HeroSection;
