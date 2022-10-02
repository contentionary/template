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
import ImageComponent from "@src/components/shared/image";
// styles, interface and cosmic query
import useGlobalStyle from "@src/styles";
import { queryClient } from "@src/utils";
import { PublicationsFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const PromoSection: PublicationsFunc = () => {
  const globalStyle = useGlobalStyle();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { user } = cachedData;
  const { description, imageUrl, title } =
    pageData?.templateData?.templateDetails.landingPageSectionTwo.contents[2];

  return (
    <Box
      component="section"
      sx={{ py: 8, px: { md: 6 }, bgcolor: "secondary.dark" }}
      className=""
    >
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
                src={imageUrl}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box>
              <Typography mb={1} variant="h4" color="GrayText">
                {title}
              </Typography>
              <Typography mb={1} align="justify" variant="h6" color="white">
                {description}
              </Typography>
            </Box>
            <NextLink href={user ? "/library" : "/login"} passHref>
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
                className={globalStyle.bgGradient}
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
