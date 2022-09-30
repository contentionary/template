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
import useGlobalStyle from "@src/styles/index";
import { PublicationsHeaderFunc } from "./interfaceType";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import ProfileMenu from "./ProfileMenu";

const PublicationsHeader: PublicationsHeaderFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { user, centre } = cachedData;

  const fontSize = 18;

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
                    src={centre.logo || "/images/logo.png"}
                    alt="Contentionary logo"
                    width={80}
                    height={80}
                    objectFit="contain"
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
                      <NextLink href="/" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light", fontSize }}
                        >
                          Home
                        </Button>
                      </NextLink>
                      <NextLink href="/library" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light", fontSize }}
                        >
                          Library
                        </Button>
                      </NextLink>
                      {user && (
                        <NextLink href="/library/my-books" passHref>
                          <Button
                            component={MuiLink}
                            sx={{ color: "secondary.light", fontSize }}
                          >
                            My Books
                          </Button>
                        </NextLink>
                      )}
                      {/* <NextLink href="#" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light", fontSize, }}
                        >
                          About Us
                        </Button>
                      </NextLink> */}
                    </Stack>
                    {user ? (
                      <ProfileMenu title={user.firstname} />
                    ) : (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <NextLink href="/login" passHref>
                          <MuiLink>Login</MuiLink>
                        </NextLink>
                        <NextLink href="/register" passHref>
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
                    )}
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
