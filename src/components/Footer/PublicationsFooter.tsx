import React, { Fragment } from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// colors
import { grey } from "@mui/material/colors";
// styles, interface ans config
import config from "@src/utils/config";
import { PublicationsFooterFunc } from "./interfaceType";

const PublicationsFooter: PublicationsFooterFunc = () => {
  return (
    <Fragment>
      <Box
        py={8}
        px={{ md: 6 }}
        component="footer"
        sx={{ backgroundColor: "black" }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box mb={3}>
                <NextLink href="/" passHref>
                  <MuiLink sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src="/images/logo.png"
                      alt="Contentionary logo"
                      width={210}
                      height={40}
                    />
                  </MuiLink>
                </NextLink>
              </Box>
              <Typography paragraph color="white" gutterBottom>
                We are not here to sell you products, we sell value through our
                expertise.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7} md={4} ml="auto">
              <Box>
                <Typography variant="h6" color="white" gutterBottom>
                  Address:
                </Typography>
                <Typography paragraph color={grey["400"]} gutterBottom>
                  38 Opebi Road, Ikeja, Lagos State, Nigeria.
                </Typography>
                <Typography variant="h6" color="white" gutterBottom>
                  TelePhone:
                </Typography>
                <NextLink href={"tel:+2349022396389"} passHref>
                  <MuiLink>+234 902 239 6389</MuiLink>
                </NextLink>
                <Typography mt={4} variant="h6" color="white" gutterBottom>
                  Contact Email
                </Typography>
                <NextLink href={"mailto:contact@contentionary.com"} passHref>
                  <MuiLink>contact@contentionary.com</MuiLink>
                </NextLink>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={2}>
              <Stack spacing={1}>
                <Typography variant="h6" color="white" gutterBottom>
                  Company
                </Typography>
                <NextLink href="/academy" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    About us
                  </MuiLink>
                </NextLink>
                <NextLink href="/library" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    Library
                  </MuiLink>
                </NextLink>
                <NextLink href="/academy" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    Home
                  </MuiLink>
                </NextLink>
              </Stack>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" color="white">
              Built with Contentionary
            </Typography>
            <NextLink href={config.URL.APP} passHref>
              <MuiLink underline="hover" color={grey["400"]}>
                www.contentionary.com
              </MuiLink>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};
export default PublicationsFooter;
