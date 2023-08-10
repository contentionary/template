import React from "react";
//
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import PortfolioSection from "./PortfolioSection";
import AboutAuthorSection from "./AboutAuthorSection";
import PublicationListSection from "./PublicationListSection";
//
import { PortfolioFunc } from "./interfaceType";

const Portfolio: PortfolioFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <AboutAuthorSection />
      <PortfolioSection />
      <PublicationListSection />
    </Box>
  );
};
export default Portfolio;
