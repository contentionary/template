import React from "react";
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
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
// components and styles
import AppDrawer from "./AppDrawer";
import ProfileMenu from "./ProfileMenu";
import HideOnScroll from "./HideOnScroll";
import ExamAndLeagueMenu from "./ExamAndLeagueMenu";
// icons
import { queryClient } from "@src/utils";
// interface and config
import { HeaderFunc } from "./interfaceType";
import { BasePageProps } from "../../utils/interface";

const ExamAndLeagueHeader: HeaderFunc = () => {
  const theme = useTheme();
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
                    alt="Edtify logo"
                    width={centre.logo ? 60 : 180}
                    height={60}
                    objectFit="contain"
                  />
                </MuiLink>
              </NextLink>
              {isMatch ? (
                <AppDrawer>
                  <ExamAndLeagueMenu cachedData={cachedData} />
                </AppDrawer>
              ) : (
                <>
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
                      <NextLink href="/leagues" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light", fontSize }}
                        >
                          Leagues
                        </Button>
                      </NextLink>
                      <NextLink href="/exams" passHref>
                        <Button
                          component={MuiLink}
                          sx={{ color: "secondary.light", fontSize }}
                        >
                          Exams
                        </Button>
                      </NextLink>
                      {user && (
                        <>
                          <NextLink href="/leagues/my-leagues" passHref>
                            <Button
                              component={MuiLink}
                              sx={{ color: "secondary.light", fontSize }}
                            >
                              My Leagues
                            </Button>
                          </NextLink>
                          <NextLink href="/exams/my-exams" passHref>
                            <Button
                              component={MuiLink}
                              sx={{ color: "secondary.light", fontSize }}
                            >
                              My Exams
                            </Button>
                          </NextLink>
                        </>
                      )}
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
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default ExamAndLeagueHeader;
