import React, { Fragment } from "react";
// next
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// components and style
import useGlobalStyle from "@src/styles";
import CodeHighlighter from "@src/components/shared/CodeHighlighter";
// import { useTheme } from "@mui/material/styles";
// interface and config
import config from "@src/utils/config";
import { HomePageFunc } from "./interfaceType";

const StartSection: HomePageFunc = () => {
  // const theme = useTheme();
  const globalStyle = useGlobalStyle();
  //

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ py: 8, px: { md: 6 }, bgcolor: "#FFFCF8" }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box maxWidth={600} sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                All you need to start an online edtech business
              </Typography>
              <Typography mb={4} paragraph sx={{ textAlign: "center" }}>
                From page beauty, to engagement to finance to tracking. Build
                your centre to your taste and size
              </Typography>
              <NextLink href={`${config.URL.WEB}create-account`} passHref>
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
            </Box>
          </Box>
        </Container>
      </Box>
      <Box component="section" sx={{ py: 8, bgcolor: "secondary.dark" }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box maxWidth={600} sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Contentionary Ecosystem
              </Typography>
              <Typography mb={4} paragraph sx={{ textAlign: "center" }}>
                The ecosystem is building Apps that will efficiently project the
                values of digital content trading, interaction, management and
                more.
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={4}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              mb: 8,
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              order={{ xs: 2, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper elevation={0} sx={{ p: 4, bgcolor: "#121212" }}>
                <CodeHighlighter />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={5} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                Build and earn with Contentionary
              </Typography>
              <Typography
                variant="h3"
                sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}
                component="h2"
              >
                Call for Dev Partners
              </Typography>
              <Typography
                mb={4}
                paragraph
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                As a developer you can build Apps that can be used by
                contentionary creators for sales, support, analysis and
                engagements. Make upto 80% integration fee from all creators.
              </Typography>
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
                  Become a dev partner
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
                  Learn more
                </Button>
              </NextLink>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default StartSection;
