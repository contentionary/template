import React from "react";
import { v1 as uuid } from "uuid";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
import { queryClient, isServerSide } from "@src/utils";
import { BasePageProps, LeagueInt } from "@src/utils/interface";

const LeagueDetails = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const leagueDetails = pageData.leagueDetails as LeagueInt;
  const auth = pageData?.auth;
  const subscriptionModel = cachedData?.centre?.subscriptionModel;
  const { id, slug } = leagueDetails;
  const {
    isCentreManager = false,
    isCentreSubscriber = false,
    isLeagueSubscriber = false,
  } = auth || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const paymentLink = `/payment?itemId=${id}&purpose=LEAGUE_SUBSCRIPTION&paymentMethod=CARD&currency=NGN&transactionkey=${uuid()}&redirectUrl=${redirectUrl}`;

  let Read = {
    link: `/leagues/${slug}/`,
    text: "OPEN LEAGUE",
    redirectUrl,
  };
  if (!isLeagueSubscriber && !isCentreManager) {
    Read.text = "Join League";
    Read.link = paymentLink;
  }

  if (!auth) Read.link = "/login";
  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection league={leagueDetails} read={Read} auth={auth} />
      <DetailsSection league={leagueDetails} read={Read} auth={auth} />
    </Box>
  );
};
export default LeagueDetails;
