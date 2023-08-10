import React from "react";
// next
import NextLink from "next/link";
// mui component
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// app components
import ImageComponent from "@src/template/components/shared/image";
// styles, interface and cosmic queries
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const PromoSection = ({ link = "/leagues" }: { link?: string }) => {
  const { pageData = null, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { user } = cachedData;
  const contents =
    pageData?.templateData?.templateDetails?.landingPageSectionTwo?.contents;
  return (
    <Box py={8} px={{ md: 6 }} component="section" bgcolor="secondary.dark">
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center" mt={{ xs: 0, md: -20 }}>
          <Grid item xs={12} md={5} display={{ xs: "none", md: "block" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <ImageComponent
                width="100%"
                height="100%"
                alt="yes we can"
                objectFit="cover"
                layout="responsive"
                src={contents && contents[1].imageUrl}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box>
              <Typography mb={4} variant="h3" component="h2" color="white">
                {contents && contents[1].title}
              </Typography>
              <Typography mb={4} paragraph color="white">
                {contents && contents[1].description}
              </Typography>
            </Box>
            <NextLink href={user ? link : "/register"} passHref>
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
                color="primary"
                sx={{
                  textAlign: "center",
                  width: { xs: "100%", md: "auto" },
                  display: { xs: "block", md: "inline-block" },
                }}
              >
                Get Started
              </Button>
            </NextLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default PromoSection;
