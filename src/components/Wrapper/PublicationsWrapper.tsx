import React from "react";
import PublicationsFooter from "../Footer/PublicationsFooter";
import PublicationsHeader from "../Header/PublicationsHeader";
import HeadPage from "../PageHead";
import { PublicationsWrapperFunc } from "./interface";

const PublicationsWrapper: PublicationsWrapperFunc = ({
  children,
  title,
  image,
  description,
  showFooter,
  showHeader,
}) => {
  return (
    <>
      <HeadPage title={title} image={image} description={description} />
      {showHeader && <PublicationsHeader />}
      <div style={{ marginTop: 40 }}>{children}</div>
      {showFooter && <PublicationsFooter />}
    </>
  );
};

export default PublicationsWrapper;
