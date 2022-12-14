import React from "react";
import Settings from "@src/components/Settings";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";

const SettingsPage = () => {
  return (
    <AcademyWrapper
      title="Profile Settings"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <Settings />
    </AcademyWrapper>
  );
};

export default SettingsPage;
