import React from "react";
import Wallet from "@src/components/wallet";
import { BasePageProps } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamAndCourseWrapper from "@src/components/Layout/Wrapper/ExamAndCourseWrapper";

const ExamsWallet = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndCourseWrapper
      title="Wallet"
      description={`${name} academy online courses and folders`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Wallet />
    </ExamAndCourseWrapper>
  );
};

export default ExamsWallet;
