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
          <Box sx={{ mb: 8, display: "flex", justifyContent: "center" }}>
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
          <Box className={globalStyle.marquee}>
            <Box className="marquee__content">
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ekscat.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/indorama.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ace.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/napps.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/siren.png"
                />
              </Box>
            </Box>
            <Box aria-hidden="true" className="marquee__content">
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ekscat.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/indorama.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ace.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/napps.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 58,
                  width: 180,
                }}
              >
                <Image
                  width={178.05}
                  height={56}
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/siren.png"
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};
export default PartnersSection;
