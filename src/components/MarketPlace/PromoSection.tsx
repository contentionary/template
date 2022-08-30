import React from "react";
// next
import NextLink from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
//
import useGlobalStyle from "@src/styles";
//
import { MarketPlaceFunc } from "./interfaceType";

const PromoSection: MarketPlaceFunc = () => {
  const globalStyle = useGlobalStyle();
  return (
    <Box
      component="section"
      sx={{ py: 8, px: { md: 4, xl: 0 }, bgcolor: "#FFFCF8" }}
      className=""
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box maxWidth={600}>
            <Typography
              mb={4}
              variant="h3"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Get access to our custom picked content on{" "}
              <Typography variant="h3" color="primary" component="span">
                Premium
              </Typography>
            </Typography>
            <Typography mb={4} paragraph sx={{ textAlign: "center" }}>
              Premium Centre gives you a vast library of prep content and prep
              exams on all categories by top industry expert. Stay at the top by
              joining the premium Centre.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <NextLink href="/" passHref>
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
              Try Premium Centre
            </Button>
          </NextLink>{" "}
          <NextLink href="/" passHref>
            <Button
              size="large"
              variant="outlined"
              component={MuiLink}
              sx={{
                textAlign: "center",
                mt: { xs: 2, md: 0 },
                textDecoration: "underline",
                borderWidth: { xs: 2, md: 0 },
                ":hover": {
                  borderWidth: { xs: 2, md: 0 },
                },
                width: { xs: "100%", md: "auto" },
                display: { xs: "block", md: "inline-block" },
              }}
            >
              Learn more about Premium
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};
export default PromoSection;
