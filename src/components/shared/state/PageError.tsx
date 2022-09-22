import React from "react";
// mui components
import Box from "@mui/material/Box";
//
import { queryClient } from "@src/pages";
import { BasePageProps } from "@src/utils/interface";
// app components
import Page400 from "./400";
import Page500 from "./500";

const PageError = () => {
  const { error } = queryClient.getQueryData("pageProps") as BasePageProps;

  if (error.statusCode >= 400 && error.statusCode < 500) {
    return (
      <Box component="main" sx={{ pt: 8 }}>
        <Page400 error={error} />
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ pt: 8 }}>
      <Page500 error={error} />
    </Box>
  );
};

export default PageError;
