import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// app components
import PublicationCard from "@src/template/components/shared/cards/PublicationCard";
// styles and interface
import { queryClient } from "@src/utils";
import { PortfolioFunc } from "./interfaceType";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const PublicationListSection: PortfolioFunc = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const publications = pageData.templateData.publications as PublicationInt[];

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Stack alignItems="center">
            <Typography
              variant="h4"
              component="h2"
              sx={{ mt: 4, textAlign: "center" }}
            >
              My Published Works
            </Typography>
            <Divider
              variant="middle"
              sx={{
                my: 2,
                width: 100,
                borderWidth: 1.5,
                borderColor: "primary.main",
                backgroundColor: "primary.main",
              }}
            />
            <Typography
              paragraph
              sx={{ mb: 4, textAlign: "center", maxWidth: 450 }}
            >
              So find most of our publications suitable for you.
            </Typography>
          </Stack>
          <Grid
            container
            mb={{ xs: 1, md: 2, xl: 3 }}
            spacing={{ xs: 1, md: 2, xl: 3 }}
            columns={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 5 }}
          >
            {publications.map((publication, index) => (
              <Grid key={`${index}-publication-card`} item xs={1}>
                <PublicationCard
                  isSubscriptionCentre={
                    cachedData.centre.subscriptionModel === "SUBSCRIPTION"
                  }
                  {...publication}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={4} textAlign="center">
            <NextLink href="/library" passHref>
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
                color="primary"
                sx={{
                  px: 8,
                  textAlign: "center",
                  width: { xs: "100%", sm: "auto" },
                  display: { xs: "block", sm: "inline-block" },
                }}
              >
                View All
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default PublicationListSection;
