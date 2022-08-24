import React, { Fragment } from "react";
//
import HeroSection from "./HeroSection";
import StepSection from "./StepSection";
import CenterSection from "./CenterSection";
import PromiseSection from "./PromiseSection";
import PartnersSection from "./PartnersSection";
//
import { HomePageFunc } from "./interfaceType";

const HomePage: HomePageFunc = () => {
  return (
    <main className="">
      <HeroSection />
      <StepSection />
      <CenterSection />
      <PromiseSection />
      <PartnersSection />
    </main>
  );
};
export default HomePage;
