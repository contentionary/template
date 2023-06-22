import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// app components
import ImageComponent from "@src/components/shared/image";
// styles and interface
import useGlobalStyle from "@src/styles";
import { queryClient } from "@src/utils";
import { PortfolioFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const AboutAuthorSection: PortfolioFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { user } = cachedData;
  const { aboutUsSectionOne = null } =
    pageData?.templateData?.templateDetails || {};

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ py: 10, px: { md: 6 } }}
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
            <Grid
              item
              md={5}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "center" },
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  height: "auto",
                  position: "relative",
                  boxShadow: `-20px 20px 0 0 white, -20px 20px 0 4px ${theme.palette.primary["main"]}`,
                }}
              >
                <Box
                  className={globalStyle.paperShadowSm}
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    padding: 2,
                  }}
                >
                  <ImageComponent
                    width="90%"
                    height="100%"
                    objectFit="cover"
                    layout="responsive"
                    alt="Edtify"
                    src={aboutUsSectionOne.imageUrl}
                    style={{ borderRadius: 8 }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography mb={0} variant="h4" component="h2">
                {aboutUsSectionOne.title}
              </Typography>
              <Divider
                variant="middle"
                sx={{
                  mb: 2,
                  mt: 0,
                  ml: 0,
                  width: 100,
                  borderWidth: 1.5,
                  borderColor: "primary.main",
                  backgroundColor: "primary.main",
                }}
              />
              <Typography fontSize={20} mb={4} paragraph>
                {aboutUsSectionOne.description}
              </Typography>
              <NextLink href={user ? "/library" : "/login"} passHref>
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  color="primary"
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
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default AboutAuthorSection;
