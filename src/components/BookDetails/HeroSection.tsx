import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// styles, interface and config
import config from "@src/utils/config";
import useGlobalStyle from "@src/styles";
import { BookDetailsPageFunc } from "./interfaceType";
// app components
// icons
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const HeroSection: BookDetailsPageFunc = () => {
  const router = useRouter();
  const { slug } = router.query;
  const globalStyle = useGlobalStyle();
  return (
    <Fragment>
      <Box
        bgcolor="#FFFCF8"
        component="section"
        className="hero-section"
        sx={{ pt: 4, pb: 8, px: { md: 6 } }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box width="90%">
                <Image
                  width="90%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  alt="Contentionary"
                  src="/images/book-1.png"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Typography mb={1} paragraph>
                <Typography variant="h6" component="span">
                  Publication ID
                </Typography>{" "}
                bfd6bb40-124f-11ec-a161-bdf69d9cefd9
              </Typography>
              <Typography mb={1} variant="h2" component="h1">
                Partial truths - How Fractions Distort Our Thinking.
              </Typography>
              <Stack direction="row" spacing={2} mt={0}>
                <Typography variant="h6">Indorama Centre</Typography>
                <Typography paragraph display="flex" alignItems="center">
                  <PeopleOutlineOutlinedIcon color="primary" /> 1.5k Readers
                </Typography>
              </Stack>
              <Stack
                mt={3}
                mb={6}
                spacing={4}
                direction={{ xs: "column", md: "row" }}
              >
                <Typography variant="h6">Author(s):</Typography>
                <Stack direction="row" flexWrap="wrap" justifyContent="start">
                  <Stack
                    mr={4}
                    mb={1}
                    spacing={1}
                    direction="row"
                    alignItems="center"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <Image
                        alt="user"
                        layout="fill"
                        objectFit="contain"
                        src="/images/avatar.png"
                      />
                    </Avatar>
                    <Typography paragraph>Chukwuemeka Peter Ukpaka</Typography>
                  </Stack>
                  <Stack
                    mr={4}
                    mb={1}
                    spacing={1}
                    direction="row"
                    alignItems="center"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <Image
                        alt="user"
                        layout="fill"
                        objectFit="contain"
                        src="/images/avatar.png"
                      />
                    </Avatar>
                    <Typography paragraph>
                      CP. Ukpaka Chukwuemeka Peter
                    </Typography>
                  </Stack>
                  <Stack
                    mr={4}
                    mb={1}
                    spacing={1}
                    direction="row"
                    alignItems="center"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <Image
                        alt="user"
                        layout="fill"
                        objectFit="contain"
                        src="/images/avatar.png"
                      />
                    </Avatar>
                    <Typography paragraph>
                      CP. Ukpaka Chukwuemeka Peter
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Typography variant="h3" component="h1">
                ₦10,000
              </Typography>
              <Stack
                mt={1}
                spacing={2}
                rowGap={1}
                flexWrap="wrap"
                direction="row"
                alignItems="center"
              >
                <NextLink href={`/library/${slug}/document`} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    className={globalStyle.bgGradient}
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <AutoStoriesOutlinedIcon /> &nbsp; READ
                    </Stack>
                  </Button>
                </NextLink>
                <NextLink href={`${config.URL.WEB}create-account`} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    className={globalStyle.bgGradient}
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <FileDownloadOutlinedIcon /> &nbsp; Download
                    </Stack>
                  </Button>
                </NextLink>
                <NextLink href={`${config.URL.WEB}create-account`} passHref>
                  <MuiLink
                    gap={2}
                    color="inherit"
                    underline="none"
                    alignItems="center"
                    display={{ xs: "flex", sm: "inline-flex" }}
                  >
                    <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
                      <ShareOutlinedIcon htmlColor="white" />
                    </Avatar>{" "}
                    Share this Book
                  </MuiLink>
                </NextLink>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default HeroSection;
