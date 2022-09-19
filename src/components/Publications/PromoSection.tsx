import React from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
// mui component
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
//
import useGlobalStyle from "@src/styles";
//
import { PublicationsFunc } from "./interfaceType";

const PromoSection: PublicationsFunc = () => {
  const globalStyle = useGlobalStyle();
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
              <Image
                width="100%"
                height="100%"
                alt="yes we can"
                objectFit="cover"
                layout="responsive"
                src="/images/avatar.png"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box>
              <Typography mb={1} variant="h4" color="white">
                A reader lives a thousand lives before he dies... The man who
                never reads lives only one.”
              </Typography>
              <Typography mb={4} variant="h4" color="white" fontStyle="italic">
                ~ George R.R. Martin
              </Typography>
              <Typography mb={4} paragraph color="white">
                Signup and start learning on your pace and time.
              </Typography>
            </Box>
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
