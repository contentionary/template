import React from "react";
//
import Box from "@mui/material/Box";
// App components
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";
//
import { PublicationInt } from "@src/utils/interface";

const BookDetails = ({
  publication,
  auth,
}: {
  publication: PublicationInt;
  auth: any;
}) => {
  publication.learnings =
    publication.learnings && publication.learnings.length
      ? publication.learnings
      : [];

  return (
    <Box component="main" position="relative" sx={{ pt: 8 }}>
      <HeroSection publication={publication} auth={auth} />
      <DetailsSection publication={publication} auth={auth} />
    </Box>
  );
};

export default BookDetails;
