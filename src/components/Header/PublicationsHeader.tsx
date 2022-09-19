import React, { Fragment } from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// mui
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
// app components
import AppDrawer from "./AppDrawer";
import HideOnScroll from "./HideOnScroll";
import PublicationsMenu from "./PublicationsMenu";
// icons
// styles, interface and config
import config from "@src/utils/config";
import useGlobalStyle from "@src/styles/index";
import { PublicationsHeaderFunc } from "./interfaceType";

const PublicationsHeader: PublicationsHeaderFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          elevation={0}
          sx={{
            px: { md: 6 },
            bgcolor: "white",
            zIndex: theme.zIndex.drawer + 2,
          }}
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
                  <PublicationsMenu />
                </AppDrawer>
              ) : (
                <Fragment>
                  <Stack
                    ml={4}
                    flexGrow={1}
                    direction="row"
                    justifyContent="space-between"
                    display={{ xs: "none", md: "flex" }}
                  >
                    <Stack direction="row" spacing={2}>
                      <NextLink href="/publications" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light" }}
                        >
                          Home
                        </Button>
                      </NextLink>
                      <NextLink href="/library" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light" }}
                        >
                          Library
                        </Button>
                      </NextLink>
                      <NextLink href="/about-us" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light" }}
                        >
                          About Us
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
                          Register
                        </Button>
                      </NextLink>
                    </Stack>
                  </Stack>
                </Fragment>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default PublicationsHeader;
