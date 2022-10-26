import React from "react";
import { v1 as uuid } from "uuid";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
import { queryClient, isServerSide } from "@src/utils";
import { BasePageProps, CourseInt } from "@src/utils/interface";

const CourseDetailsPage = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courseDetails = pageData.courseDetails as CourseInt;
  const auth = pageData?.auth;

  const { id, price, slug, contents } = courseDetails;
  const { isCentreManager = false, isCourseSubscriber = false } = auth || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const paymentLink = `/payment?itemId=${id}&purpose=COURSE_SUBSCRIPTION&paymentMethod=CARD&amount=${price}&currency=NGN&transactionkey=${uuid()}&redirectUrl=${redirectUrl}&verifyValue=${price}`;

  const [module] = contents;
  const contentId = module?.contents?.length
    ? module?.contents[0].id
    : module?.id;

  let Action = {
    link: `/courses/${slug}/${id}${contentId ? `/contents/${contentId}` : ""}`,
    text: "OPEN COURSE",
    redirectUrl,
  };

  if (!isCourseSubscriber && !isCentreManager) {
    Action.text = "SUBSCRIBE";
    Action.link = paymentLink;
  }

  if (!auth) Action.link = "/login";

  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection
        courseDetails={courseDetails}
        action={Action}
        isSubscriber={Boolean(
          auth?.isCentreManager || auth?.isCourseSubscriber
        )}
      />
      <DetailsSection
        courseDetails={courseDetails}
        action={Action}
        isSubscriber={Boolean(
          auth?.isCentreManager || auth?.isCourseSubscriber
        )}
      />
    </Box>
  );
};

export default CourseDetailsPage;
