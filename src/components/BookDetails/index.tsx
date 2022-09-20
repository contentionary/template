import React from "react";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
//
import { queryClient } from "@src/pages";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const BookDetails = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const publication = pageData.publication as PublicationInt;

  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection {...publication} />
      <DetailsSection {...publication} />
    </Box>
  );
};

export default BookDetails;
