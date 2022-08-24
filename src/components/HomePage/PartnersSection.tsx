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
//
import useGlobalStyle from "@src/styles";
import { useTheme } from "@mui/material/styles";
import { blueGrey, grey, indigo } from "@mui/material/colors";
// interface
import { HomePageFunc } from "./interfaceType";
// icons
import BookIcon from "@src/assets/icons/book.svg";
import TeacherIcon from "@src/assets/icons/teacher.svg";
import ShopAddIcon from "@src/assets/icons/shop-add.svg";
import MedalStarIcon from "@src/assets/icons/medal-star.svg";

const PartnersSection: HomePageFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();

  return (
    <main className="">
      <Box component="section" sx={{ py: 8 }} className="">
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box maxWidth={400}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                OUR PARTNERS
              </Typography>
              <Typography
                mb={4}
                variant="h3"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                We are trusted by top businesses
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                <Avatar
                  sx={{ bgcolor: theme.palette.primary["100"] }}
                  variant="rounded"
                >
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
          </Grid>
        </Container>
      </Box>
    </main>
  );
};
export default PartnersSection;
