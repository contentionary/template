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
import { BasePageProps } from "@src/utils/interface";

export const AppMenuLink = ({
  url,
  title,
  fontSize,
}: {
  url: string;
  title: string;
  fontSize: number;
}) => {
  return (
    <NextLink href={url} passHref>
      <Button component={MuiLink} sx={{ color: "secondary.light", fontSize }}>
        {title}
      </Button>
    </NextLink>
  );
};

const CourseExamLeaguePublicationHeader: HeaderFunc = () => {
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
                      {centre.plugins.COURSE && (
                        <AppMenuLink
                          url="/courses"
                          title="Courses"
                          fontSize={fontSize}
                        />
                      )}
                      {centre.plugins.EXAM && (
                        <AppMenuLink
                          url="/exams"
                          title="Exams"
                          fontSize={fontSize}
                        />
                      )}
                      {centre.plugins.PUBLICATION && (
                        <AppMenuLink
                          url="/library"
                          title="Books"
                          fontSize={fontSize}
                        />
                      )}
                      {centre.plugins.LEAGUE && (
                        <AppMenuLink
                          url="/leagues"
                          title="Leagues"
                          fontSize={fontSize}
                        />
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

export default CourseExamLeaguePublicationHeader;
