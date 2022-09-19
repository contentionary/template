import React, { Fragment } from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
//
import { useTheme } from "@mui/material/styles";
//
import { Link as MuiLink } from "@mui/material";
// components and styles
import AppMenu from "./AppMenu";
import AppsMenu from "./AppsMenu";
import AppDrawer from "./AppDrawer";
import ResourceMenu from "./ResourceMenu";
import HideOnScroll from "./HideOnScroll";
import useGlobalStyle from "@src/styles/index";
// icons
// interface and config
import config from "@src/utils/config";
import { HeaderFunc } from "./interfaceType";

const Header: HeaderFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          elevation={0}
          sx={{ bgcolor: "white", py: 1, px: { md: 6 } }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
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
              {isMatch ? (
                <AppDrawer>
                  <AppMenu />
                </AppDrawer>
              ) : (
                <Fragment>
                  <Box
                    sx={{
                      marginLeft: 2,
                      flexGrow: 1,
                      display: {
                        xs: "none",
                        md: "flex",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <AppsMenu />
                      <ResourceMenu />
                      <NextLink href={`${config.URL.WEB}pricing`} passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light" }}
                        >
                          Pricing
                        </Button>
                      </NextLink>
                      <NextLink href={`${config.URL.WEB}market-place`} passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light" }}
                        >
                          Marketplace
                        </Button>
                      </NextLink>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <NextLink href={`${config.URL.WEB}login`} passHref>
                        <MuiLink>Login</MuiLink>
                      </NextLink>
                      <NextLink
                        href={`${config.URL.WEB}create-account`}
                        passHref
                      >
                        <Button
                          size="large"
                          disableElevation
                          variant="contained"
                          component={MuiLink}
                          className={globalStyle.bgGradient}
                        >
                          Create Account
                        </Button>
                      </NextLink>
                    </Stack>
                  </Box>
                </Fragment>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default Header;
