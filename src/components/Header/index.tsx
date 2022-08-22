import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
import Image from "next/image";
// mui
import {
  Box,
  Menu,
  Button,
  AppBar,
  Toolbar,
  MenuItem,
  useTheme,
  Container,
  Typography,
  useMediaQuery,
  Link as MuiLink
} from "@mui/material";
import { grey } from "@mui/material/colors";
// components/resources
import AppDrawer from "./AppDrawer";
import ContentionaryLogo from "@src/assets/images/logo.png";
// interface
import { HeaderFunc } from "./interfaceType";

//
const pages = ["Apps", "Resources", "Pricing", "Marketplace"];

const Header: HeaderFunc = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment>
      <AppBar
        component="nav"
        sx={{ position: "relative", background: "white" }}
        elevation={0}
      >
        <Container maxWidth="xl">
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
                      justifyContent: "flex-between",
                    },
                  }}
                >
                  <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
                    {pages.map((page) => (
                      <NextLink key={page} href="/" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ my: 2, color: "black", display: "block" }}
                        >
                          {page}
                        </Button>
                      </NextLink>
                    ))}
                  </Box>
                  {/* <Link href={"/"}>Apps</Link> */}
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
