import React from "react";
import Wallet from "@src/components/wallet";
import AcademyWrapper from "@src/components/Layout/Wrapper/AcademyWrapper";

const WalletPage = () => {
  return (
    <AcademyWrapper
      title="Wallet"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <Wallet />
    </AcademyWrapper>
  );
};

export default WalletPage;
