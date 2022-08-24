import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import useGlobalStyle from "@src/styles";
import { useTheme } from "@mui/material/styles";
// interface
import { HomePageFunc } from "./interfaceType";

const PartnersSection: HomePageFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ py: 8 }} className="">
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box maxWidth={400}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                OUR PARTNERS
              </Typography>
              <Typography
                mb={2}
                variant="h3"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                We are trusted by top businesses
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={6} sm={4} md={3} xl={2}>
              <Box
                sx={{
                  position: "relative",
                  height: "auto",
                  width: "100%",
                }}
              >
                <Image
                  width="100%"
                  height={56}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ekscat.png"
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3} xl={2}>
              <Box
                sx={{
                  position: "relative",
                  height: "auto",
                  width: "100%",
                }}
              >
                <Image
                  width="100%"
                  height={56}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/indorama.png"
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3} xl={2}>
              <Box
                sx={{
                  position: "relative",
                  height: "auto",
                  width: "100%",
                }}
              >
                <Image
                  width="100%"
                  height={56}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ace.png"
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3} xl={2}>
              <Box
                sx={{
                  position: "relative",
                  height: "auto",
                  width: "100%",
                }}
              >
                <Image
                  width="100%"
                  height={56}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/napps.png"
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3} xl={2}>
              <Box
                sx={{
                  position: "relative",
                  height: "auto",
                  width: "100%",
                }}
              >
                <Image
                  width="100%"
                  height={56}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/siren.png"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default PartnersSection;
