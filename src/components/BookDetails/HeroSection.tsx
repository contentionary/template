import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
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
import useGlobalStyle from "@src/styles";
import { BookDetailsPageFunc } from "./interfaceType";
// app components
// icons
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const HeroSection: BookDetailsPageFunc = ({
  id,
  imageUrl,
  name,
  price,
  subscriberCount,
  authors,
  fileUrl = "#",
}) => {
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
          <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "end" },
              }}
            >
              <Typography mb={0} paragraph>
                <Typography variant="h6" component="span">
                  Publication ID
                </Typography>{" "}
                {id}
              </Typography>
              <Box width="100%">
                <Image
                  width="100%"
                  height="120%"
                  layout="responsive"
                  alt="Contentionary"
                  src={imageUrl || "/images/book-2.png"}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Typography variant="h2" component="h1">
                {name}
              </Typography>
              <Stack direction="row" spacing={2} mt={1}>
                {/* <Typography variant="h6">Indorama Centre</Typography> */}
                <Typography paragraph display="flex" alignItems="center">
                  <PeopleOutlineOutlinedIcon color="primary" />{" "}
                  {subscriberCount}k Subscribers
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
                  {authors?.map(({ name, imageUrl }, index) => (
                    <Stack
                      mr={4}
                      mb={1}
                      spacing={1}
                      direction="row"
                      alignItems="center"
                      key={index + "author"}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <Image
                          alt="user"
                          layout="fill"
                          objectFit="contain"
                          src={imageUrl || "/images/avatar.png"}
                        />
                      </Avatar>
                      <Typography paragraph>{name}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Typography variant="h3" component="h1">
                ₦{price}
              </Typography>
              <Stack
                mt={1}
                spacing={2}
                rowGap={1}
                flexWrap="wrap"
                direction="row"
                alignItems="center"
              >
                <NextLink href={fileUrl} passHref>
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
                <NextLink href={fileUrl} passHref>
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
                <NextLink href={fileUrl} passHref>
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
