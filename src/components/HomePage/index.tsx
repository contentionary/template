import React, { Fragment } from "react";
//
import HeroSection from "./HeroSection";
import StepSection from "./StepSection";
import StartSection from "./StartSection";
import BuiltSection from "./BuiltSection";
import CenterSection from "./CenterSection";
import PromiseSection from "./PromiseSection";
import PartnersSection from "./PartnersSection";
import TestimonialSection from "./TestimonialSection";
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
      <BuiltSection />
      <TestimonialSection />
      <StartSection />
    </main>
  );
};
export default HomePage;
