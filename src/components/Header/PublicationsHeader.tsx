import React, { Fragment, useState } from "react";
// next components
import Image from "@src/components/shared/image";
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
import { IconButton, Link as MuiLink } from "@mui/material";
import Campaign from "@mui/icons-material/Campaign";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Typography from "@mui/material/Typography";
// app components
import AppDrawer from "./AppDrawer";
import HideOnScroll from "./HideOnScroll";
import PublicationsMenu from "./PublicationsMenu";
// icons
// styles, interface and config
import ProfileMenu from "./ProfileMenu";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { PublicationsHeaderFunc } from "./interfaceType";

const PublicationsHeader: PublicationsHeaderFunc = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { user, centre } = cachedData;
  const [show, setShow] = useState(true);
  const fontSize = 18;

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          elevation={0}
          sx={{
            // px: { md: 6 },
            bgcolor: "white",
            zIndex: theme.zIndex.drawer + 2,
          }}
        >
          {" "}
          {show && (
            <Typography
              variant="h5"
              sx={{
                justifyContent: "center",
                padding: 1,
                background: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <Campaign sx={{ fontSize: 40, mr: 1 }} />
              We’re excited to launch learn Africa E-store | Access our books
              for free from now till 9th April 2023.
              <IconButton
                onClick={() => setShow(false)}
                style={{ color: "red", marginLeft: 1 }}
              >
                <CloseOutlined />
              </IconButton>
            </Typography>
          )}
          <Container style={{ padding: "0 5px 5px 5px" }} maxWidth="xl">
            <Toolbar disableGutters>
              <NextLink href="/" passHref>
                <MuiLink sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={centre.logo || "/images/logo.png"}
                    alt="Edtify logo"
                    width={centre.logo ? 60 : 180}
                    height={60}
                    objectFit="contain"
                  />
                </MuiLink>
              </NextLink>
              {isMatch ? (
                <AppDrawer>
                  <PublicationsMenu cachedData={cachedData} />
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
                      <ProfileMenu cachedData={cachedData} />
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
                            color="primary"
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
