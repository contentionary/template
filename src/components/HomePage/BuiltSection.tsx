import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// components and styles
import useGlobalStyle from "@src/styles";
import CodeHighlighter from "@src/components/shared/CodeHighlighter";
// interface
import { HomePageFunc } from "./interfaceType";
// icons
import ShareIcon from "@src/assets/icons/share.svg";
import RankingIcon from "@src/assets/icons/ranking.svg";
import TrendUpIcon from "@src/assets/icons/trend-up.svg";
import InfinityIcon from "@src/assets/icons/infinity.svg";

const BuiltSection: HomePageFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ py: 8, px: { md: 6 } }} className="">
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box maxWidth={600}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                From a one-man business to a multinational firm
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Built for Non-techies and Developers
              </Typography>
              <Typography mb={4} paragraph sx={{ textAlign: "center" }}>
                One platform with all the features and Apps that can help you
                impact better and grow bigger activities.
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={4}
            sx={{ alignItems: "center", justifyContent: "center", mb: 8 }}
          >
            <Grid
              item
              md={6}
              lg={5}
              xs={12}
              order={{ xs: 2, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <Box
                className={globalStyle.bgArtifactFlipped}
                sx={{
                  width: "100%",
                  height: "auto",
                  position: "relative",
                  padding: { xs: 2, sm: 3, lg: 4 },
                }}
              >
                <Image
                  width="100%"
                  height="80%"
                  objectFit="cover"
                  layout="responsive"
                  alt="Contentionary"
                  src="/images/built-img.png"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={5} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ mt: 4, textAlign: { xs: "center", sm: "left" } }}
              >
                (For Non Techies)
              </Typography>
              <Typography
                variant="h3"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h2"
              >
                Launch in Minutes
              </Typography>
              <Typography
                mb={4}
                paragraph
                sx={{ textAlign: { xs: "center", sm: "left" } }}
              >
                You don’t need any technical knowledge to launch a centre in
                contentionary. If you don’t have a domain you can choose a
                subdomain that best suit your business name.
              </Typography>
              <NextLink
                href="https://web.contentionary.com/create-account"
                passHref
              >
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  className={globalStyle.bgGradient}
                  sx={{
                    textAlign: "center",
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                >
                  Get Started for Free
                </Button>
              </NextLink>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            sx={{ alignItems: "center", justifyContent: "center", mb: 8 }}
          >
            <Grid item xs={12} md={6} lg={5}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ mt: 4, textAlign: { xs: "center", sm: "left" } }}
              >
                (For Techies/Developers)
              </Typography>
              <Typography
                variant="h3"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h2"
              >
                Plug and Enjoy
              </Typography>
              <Typography
                mb={4}
                paragraph
                sx={{ textAlign: { xs: "center", sm: "left" } }}
              >
                Are you developing a product or managing an app? Implement any
                and all Contentionary’s feature Apps with just a few line of
                codes.{" "}
                <NextLink href="/" passHref>
                  <MuiLink>Read more...</MuiLink>
                </NextLink>
              </Typography>
              <NextLink
                href="https://web.contentionary.com/create-account"
                passHref
              >
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  className={globalStyle.bgGradient}
                  sx={{
                    textAlign: "center",
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                >
                  Get Started for Free
                </Button>
              </NextLink>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper
                elevation={0}
                sx={{ padding: { xs: 2, sm: 3, lg: 4 }, bgcolor: "#FFFCF8" }}
              >
                <CodeHighlighter />
              </Paper>
            </Grid>
          </Grid>
          {/*  */}
          <Typography
            variant="h4"
            component="h2"
            mb={8}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            We got you covered
          </Typography>
          <Grid container spacing={4}>
            <Grid item md={4} sm={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "white" }} variant="rounded">
                  <RankingIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Private Educators
                </Typography>
                <Typography paragraph mb={0}>
                  Access Apps to teach, test and share content with your
                  students. Track activities and integrate other support Apps
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "white" }} variant="rounded">
                  <InfinityIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Creators
                </Typography>
                <Typography paragraph mb={0}>
                  Transform your teaching to online school and trade courses
                  globally. Integrate Apps to teach, screen, certify and promote
                  your courses.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "white" }} variant="rounded">
                  <ShareIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Examiners
                </Typography>
                <Typography paragraph mb={0}>
                  Add Exam Apps to your centre and screen unlimited candidates.
                  You can invites and track exams remotely using other support
                  Apps. your courses.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "white" }} variant="rounded">
                  <RankingIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Schools & Institutes
                </Typography>
                <Typography paragraph mb={0}>
                  For schools who wants a complete e-learning and testing tool
                  and other day-to-day administrative activities.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "white" }} variant="rounded">
                  <InfinityIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Authors & Publishers
                </Typography>
                <Typography paragraph mb={0}>
                  Activate Apps that will help you promote your publications,
                  sell and give additional support to your buyers.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "white" }} variant="rounded">
                  <TrendUpIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  HR Firms & Departments
                </Typography>
                <Typography paragraph mb={0}>
                  Activate proctored exam App to screen job applicants. Conduct
                  survey and psychometric exams easily.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default BuiltSection;
