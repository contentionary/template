import React, { Fragment } from "react";
// next components
import Image from "@src/components/shared/image";
import NextLink from "next/link";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// colors
import { grey } from "@mui/material/colors";
// styles, interface ans config
import config from "@src/utils/config";
import { queryClient } from "@src/utils";
import { FooterFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const CourseExamLeaguePublicationFooter: FooterFunc = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { logo, emailAddress, phoneNumber, address, name, description } =
    cachedData.centre;

  return (
    <Fragment>
      <Box
        py={8}
        px={{ md: 6 }}
        component="footer"
        sx={{ backgroundColor: "purple" }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box mb={3}>
                <NextLink href="/" passHref>
                  <MuiLink sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      alt={name}
                      width={64}
                      height={64}
                      src={logo}
                      objectFit="contain"
                    />
                  </MuiLink>
                </NextLink>
              </Box>
              <Typography paragraph color="white" gutterBottom>
                {description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7} md={4} ml="auto">
              <Box>
                <Typography variant="h6" color="white" gutterBottom>
                  Address:
                </Typography>
                <Typography paragraph color={grey["400"]} gutterBottom>
                  {address}
                </Typography>
                <Typography variant="h6" color="white" gutterBottom>
                  TelePhone:
                </Typography>
                <NextLink href={`tel:${phoneNumber}`} passHref>
                  <MuiLink style={{ color: grey["400"] }}>
                    {phoneNumber}
                  </MuiLink>
                </NextLink>
                <Typography mt={4} variant="h6" color="white" gutterBottom>
                  Contact Email
                </Typography>
                <NextLink href={`mailto:${emailAddress}`} passHref>
                  <MuiLink style={{ color: grey["400"] }}>
                    {emailAddress}
                  </MuiLink>
                </NextLink>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={2}>
              <Stack spacing={1}>
                <Typography variant="h6" color="white" gutterBottom>
                  Company
                </Typography>
                <NextLink href="/courses" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    Courses
                  </MuiLink>
                </NextLink>
                <NextLink href="/library" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    Books
                  </MuiLink>
                </NextLink>
                <NextLink href="/leagues" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    Leagues
                  </MuiLink>
                </NextLink>
                <NextLink href="/exams" passHref>
                  <MuiLink underline="hover" color={grey["400"]}>
                    Exams
                  </MuiLink>
                </NextLink>
              </Stack>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" color="white">
              Built with Edtify
            </Typography>
            <NextLink href={config.URL.APP} passHref>
              <MuiLink underline="hover" color={grey["400"]}>
                www.edtify.com
              </MuiLink>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};
export default CourseExamLeaguePublicationFooter;
