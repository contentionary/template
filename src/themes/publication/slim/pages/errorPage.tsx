import React from "react";
//
import PageError from "@src/components/shared/state/PageError";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";

const ErrorPage = () => {
  return (
    <PublicationsWrapper
      title="Contentionary | Publications"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </PublicationsWrapper>
  );
};

export default ErrorPage;
