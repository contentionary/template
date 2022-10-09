import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// app components
import PublicationCard from "@src/components/shared/cards/PublicationCard";
// styles and interface
import useGlobalStyle from "@src/styles";
import { PublicationsFunc } from "./interfaceType";
import { queryClient } from "@src/utils";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const PublicationListSection: PublicationsFunc = () => {
  const globalStyle = useGlobalStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const publications = pageData.templateData.publications as PublicationInt[];

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Typography
            mb={4}
            variant="h4"
            component="h2"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Browse Contents
          </Typography>
          <Grid
            container
            mb={{ xs: 1, md: 2, xl: 3 }}
            spacing={{ xs: 1, md: 2, xl: 3 }}
            columns={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 5 }}
          >
            {publications.map((publication, index) => (
              <Grid key={`${index}-publication-card`} item xs={1}>
                <PublicationCard {...publication} />
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
                className={globalStyle.bgGradient}
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
