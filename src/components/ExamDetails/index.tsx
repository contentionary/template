import React from "react";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
//
import { isServerSide } from "@src/utils";
import { ExamInt } from "@src/utils/interface";

const ExamDetails = ({ exam, auth }: { exam: ExamInt; auth: any }) => {
  const { price, id, slug } = exam || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const paymentLink = auth
    ? `
    /payment?itemId=${id}&purpose=PUBLICATION_SUBSCRIPTION&paymentMethod=CARD&amount=${price}&currency=NGN&redirectUrl=${redirectUrl}`
    : "/login";

  let Read = {
    link: `/library/${slug}/document/${id}`,
    // show: allowRead,
    show: true,
    text: "READ",
  };

  if (auth?.isCentreManager) {
    Read.show = true;
  } else if (!auth?.isPublicationSubscriber) {
    Read.text = "SUBSCRIBE";
    Read.link = paymentLink;
  }

  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection read={Read} exam={exam} auth={auth} />
      <DetailsSection read={Read} exam={exam} auth={auth} />
    </Box>
  );
};

export default ExamDetails;
