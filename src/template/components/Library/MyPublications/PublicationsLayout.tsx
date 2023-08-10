import React from "react";
// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import PublicationListSection from "../PublicationListSection";
import MyPublicationsBreadcrumbs from "./MyPublicationsBreadcrumbs";
// interface
import { queryClient } from "@src/utils";
import { LibraryPageFunc } from "../interfaceType";
import { BasePageProps } from "@src/utils/interface";

const MyPublicationsLayout: LibraryPageFunc = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;

  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <MyPublicationsBreadcrumbs />
        <Typography mb={4} variant="h4" component="h2">
          My Books
        </Typography>
        <PublicationListSection pageData={pageData} cachedData={cachedData} />
      </Container>
    </Box>
  );
};

export default MyPublicationsLayout;
