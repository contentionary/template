import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// app components
// styles and interface
import useGlobalStyle from "@src/styles";
import { queryClient } from "@src/utils";
import { PublicationsFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const BestAuthorSection: PublicationsFunc = () => {
  const globalStyle = useGlobalStyle();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { user } = cachedData;
  const { description, imageUrl, title } =
    pageData?.templateData?.templateDetails.landingPageSectionTwo.contents[0];

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Grid
            mb={8}
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={6} lg={5}>
              <Typography mb={2} variant="h4" component="h2">
                {title}
              </Typography>
              <Typography fontSize={20} mb={4} paragraph>
                {description}
              </Typography>
              <NextLink href={user ? "/library" : "/login"} passHref>
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  className={globalStyle.bgGradient}
                  sx={{
                    textAlign: "center",
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                >
                  Get Started
                </Button>
              </NextLink>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <Box
                className={globalStyle.bgArtifact}
                sx={{
                  width: "100%",
                  height: "auto",
                  position: "relative",
                  padding: { xs: 2, sm: 3, lg: 4 },
                }}
              >
                <Image
                  width="100%"
                  height="80%"
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src={imageUrl}
                  style={{ borderRadius: 8 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default BestAuthorSection;
