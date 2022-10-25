import React from "react";
import { v1 as uuid } from "uuid";
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
    /payment?itemId=${id}&purpose=EXAM_SUBSCRIPTION&paymentMethod=CARD&amount=${price}&currency=NGN&transactionkey=${uuid()}&redirectUrl=${redirectUrl}`
    : "/login";

  let Read = {
    link: `/exams/${slug}/start`,
    show: true,
    text: "START EXAM",
  };

  if (!auth?.isExamSubscriber && !auth?.isCentreManager) {
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
