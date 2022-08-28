import React, { Fragment } from "react";
//
import Box from "@mui/material/Box";
//
import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";
//
import { MarketPlaceFunc } from "./interfaceType";

const HomePage: MarketPlaceFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <ProductsSection />
    </Box>
  );
};
export default HomePage;
