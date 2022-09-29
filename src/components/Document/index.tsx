import React, { useEffect, useState } from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import HeroSection from "./HeroSection";
import ReaderSection from "./ReaderSection";
//
import { queryClient } from "@src/utils";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const Document = () => {
  const [isWindow, setIsWindow] = useState(false);
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const publication = pageData.publication as PublicationInt;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindow(true);
    }
  }, []);

  return (
    <Box component="main" sx={{ pt: 8 }}>
      {isWindow === true ? <ReaderSection {...publication} /> : ""}
    </Box>
  );
};

export default Document;
