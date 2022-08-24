import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
import Image from "next/image";
// mui
import {
  Box,
  Menu,
  Stack,
  Button,
  AppBar,
  Toolbar,
  MenuItem,
  useTheme,
  Container,
  Typography,
  useMediaQuery,
  Link as MuiLink,
} from "@mui/material";
import { grey } from "@mui/material/colors";
// components/resources
import AppDrawer from "./AppDrawer";
import useGlobalStyle from "@src/styles/index";
import ContentionaryLogo from "@src/assets/images/logo.png";
// interface
import { HeaderFunc } from "./interfaceType";

const Header: HeaderFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment>
      <AppBar
        component="nav"
        sx={{ position: "relative", background: "white" }}
        elevation={0}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Image
              src={ContentionaryLogo}
              alt="Contentionary logo"
              width={157}
              height={30}
            />
            {isMatch ? (
              <AppDrawer />
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
                    <NextLink href="/#apps" passHref>
                      <Button component={MuiLink} sx={{ color: "#616161" }}>
                        Apps
                      </Button>
                    </NextLink>
                    <NextLink href="/#resources" passHref>
                      <Button component={MuiLink} sx={{ color: "#616162" }}>
                        Resources
                      </Button>
                    </NextLink>
                    <NextLink href="/#pricing" passHref>
                      <Button component={MuiLink} sx={{ color: "#616161" }}>
                        Pricing
                      </Button>
                    </NextLink>
                    <NextLink href="/#marketplace" passHref>
                      <Button component={MuiLink} sx={{ color: "#616161" }}>
                        Marketplace
                      </Button>
                    </NextLink>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <NextLink href="/" passHref>
                      <MuiLink>Login</MuiLink>
                    </NextLink>
                    <NextLink href="/" passHref>
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
    </Fragment>
  );
};
export default Header;
