import React from "react";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import PublicationsMenu from "./PublicationsMenu";
import PublicationBreadcrumbs from "./PublicationBreadcrumbs";
import PublicationListSection from "./PublicationListSection";
// interface
import { LibraryPageFunc } from "./interfaceType";

const PublicationsLayout: LibraryPageFunc = () => {
  return (
    <Box component="section" sx={{ pt: 2, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <PublicationBreadcrumbs />
        <Grid
          container
          spacing={{ xs: 1, lg: 2 }}
          columns={{ xs: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
        >
          <Grid item xs={1} sm={3} md={1} lg={1} xl={1}>
            <PublicationsMenu />
          </Grid>
          <Grid item xs={1} sm={3} md={3} lg={4} xl={5}>
            <Typography mb={4} variant="h4" component="h2">
              Explore Publications
            </Typography>
            <PublicationListSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PublicationsLayout;
