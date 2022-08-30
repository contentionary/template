import React from "react";
//
import Box from "@mui/material/Box";
//
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import ProductsSection from "./ProductsSection";
import CourseListSection from "./CourseListSection";
//
import { MarketPlaceFunc } from "./interfaceType";

const HomePage: MarketPlaceFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeroSection />
      <ProductsSection />
      <CourseListSection />
      <PromoSection />
    </Box>
  );
};
export default HomePage;
