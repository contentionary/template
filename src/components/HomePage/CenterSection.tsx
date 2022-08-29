import React, { Fragment } from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import useGlobalStyle from "@src/styles";
// import { useTheme } from "@mui/material/styles";
// interface
import { HomePageFunc } from "./interfaceType";
// icons
import BookIcon from "@src/assets/icons/book.svg";
import TeacherIcon from "@src/assets/icons/teacher.svg";
import ShopAddIcon from "@src/assets/icons/shop-add.svg";
import MedalStarIcon from "@src/assets/icons/medal-star.svg";

const CenterSection: HomePageFunc = () => {
  // const theme = useTheme();
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ py: 8 }} className="">
        <Container maxWidth="xl">
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            E- Education in its wholeness
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            mb={8}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            What you can do with your centre
          </Typography>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "#FBEEE6" }} variant="rounded">
                  <TeacherIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  As an Academy
                </Typography>
                <Typography paragraph mb={0}>
                  Upload your contents and allow your students to access them
                  for a fee or with an access code, conduct remote exams with
                  online supervision and issue online certification.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "#FBEEE6" }} variant="rounded">
                  <BookIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  As an Exam Centre:
                </Typography>
                <Typography paragraph mb={0}>
                  Set remote exams for your students, host screening test with
                  instant marking, multiple question types, online supervision,
                  questions randomization and many more super features.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "#FBEEE6" }} variant="rounded">
                  <ShopAddIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  As a Marketplace
                </Typography>
                <Typography paragraph mb={0}>
                  Trade contents to your subscribers via your Centre. Online
                  courses, exam preparatory questions, ebooks, podcasts and
                  other publications. Prices for contents are decided by you.
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar sx={{ bgcolor: "#FBEEE6" }} variant="rounded">
                  <MedalStarIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  As an Edu-Game Application:
                </Typography>
                <Typography paragraph mb={0}>
                  Use your centre to engage your audience. Host online
                  competitions for your subscribers to participate and win
                  prices. Invite candidates to the competition and configure
                  other requirements.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default CenterSection;
