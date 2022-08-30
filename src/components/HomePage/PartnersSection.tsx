import React, { Fragment } from "react";
// next
import Image from "next/image";
//
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import useGlobalStyle from "@src/styles";
// import { useTheme } from "@mui/material/styles";
// interface
import { HomePageFunc } from "./interfaceType";

const PartnersSection: HomePageFunc = () => {
  // const theme = useTheme();
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ py: 8, px: { md: 4, xl: 0 } }}
        className=""
      >
        <Container maxWidth="xl">
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
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/alloshcollegelogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/cobankinglogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ifocollegelogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/indoramalogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/institute of criminology logo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/kingspolylogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/lincolnunicollegelogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/nounlogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/stwiniciscologo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/stwinifredinnovationlogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/yewacolleglogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/zibehcollegelogo.png"
                />
              </Box>
            </Box>
            <Box className="marquee__content">
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/alloshcollegelogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/cobankinglogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/ifocollegelogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/indoramalogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/institute of criminology logo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/kingspolylogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/lincolnunicollegelogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/nounlogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/stwiniciscologo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/stwinifredinnovationlogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/yewacolleglogo.png"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: 220,
                }}
              >
                <Image
                  width={210}
                  height={30}
                  objectFit="contain"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/partners/zibehcollegelogo.png"
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
