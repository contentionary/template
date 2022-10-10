import React from "react";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
//
import { PublicationInt } from "@src/utils/interface";
import { FILE_DOWNLOAD_URL, isServerSide } from "../../utils";

const BookDetails = ({
  publication,
  auth,
}: {
  publication: PublicationInt;
  auth: any;
}) => {
  const { price, id, allowDownload, allowRead, fileUrl, slug } =
    publication || {};

  const redirectUrl = !isServerSide ? window.location.href : "";
  const paymentLink = auth
    ? `
    /payment?itemId=${id}&purpose=PUBLICATION_SUBSCRIPTION&paymentMethod=CARD&amount=${price}&currency=NGN&redirectUrl=${redirectUrl}`
    : "/login";

  let Read = {
    link: `/library/${slug}/document/${id}`,
    show: allowRead,
    text: "READ",
  };
  let Download = { link: FILE_DOWNLOAD_URL + fileUrl, show: allowDownload };

  if (auth?.isCentreManager) {
    Read.show = true;
    Download.show = true;
  } else if (!auth?.isPublicationSubscriber) {
    Read.text = "SUBSCRIBE";
    Read.link = paymentLink;
    Download.link = paymentLink;
  }

  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection
        read={Read}
        download={Download}
        publication={publication}
        auth={auth}
      />
      <DetailsSection
        read={Read}
        download={Download}
        publication={publication}
        auth={auth}
      />
    </Box>
  );
};

export default BookDetails;
