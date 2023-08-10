import React from "react";
import { v1 as uuid } from "uuid";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
//
import { CachedCentreInt, PublicationInt } from "@src/utils/interface";
import { isServerSide } from "@src/utils";

const BookDetails = ({
  publication,
  auth,
  centre,
}: {
  publication: PublicationInt;
  auth: any;
  centre: CachedCentreInt;
}) => {
  const { id, allowRead, slug } = publication || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const paymentLink = auth
    ? `
    /payment?itemId=${id}&purpose=PUBLICATION_SUBSCRIPTION&paymentMethod=CARD&currency=NGN&transactionkey=${uuid()}&redirectUrl=${redirectUrl}`
    : "/login";

  let Read = {
    link: `/library/${slug}/document/${id}`,
    show: allowRead,
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
      <HeroSection
        centre={centre}
        read={Read}
        publication={publication}
        auth={auth}
      />
      <DetailsSection
        centre={centre}
        read={Read}
        publication={publication}
        auth={auth}
      />
    </Box>
  );
};

export default BookDetails;
