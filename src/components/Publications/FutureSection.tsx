import React from "react";
// next
import Image from "next/image";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// icons
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// component and styles
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
//
import { PublicationsFunc } from "./interfaceType";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const FutureSection: PublicationsFunc = () => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { imageUrl, title } =
    pageData?.templateData?.templateDetails.landingPageSectionTwo.contents[1];

  return (
    <Box className="" component="section" sx={{ py: 8, px: { md: 6 } }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h4" mb={4}>
          {title}
        </Typography>
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item md={4} xs={12}>
            <Box className={cardStyle.breathCard}>
              <Paper className="right">
                <Avatar
                  sx={{
                    mx: "auto",
                    bgcolor: "#FBEEE6",
                  }}
                >
                  <BusinessCenterOutlinedIcon color="primary" />
                </Avatar>
                <Typography
                  my={1}
                  pb={1}
                  variant="h6"
                  className={globalStyle.underlinedCurve}
                >
                  Stay <br /> Knowledgeable
                </Typography>
              </Paper>
              <Box className="breath-img-container">
                <Image
                  layout="fill"
                  alt="yes we can"
                  objectFit="cover"
                  objectPosition="right"
                  src={imageUrl}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography variant="h3" component="h2">
              Stay in-touch with the Best Always
            </Typography>
            <List>
              <ListItem sx={{ px: 0 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: "#FBEEE6",
                  }}
                >
                  <AutoStoriesOutlinedIcon color="primary" />
                </Avatar>
                <ListItemText primary="Top Publications" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: "#FBEEE6",
                  }}
                >
                  <TimerOutlinedIcon color="primary" />
                </Avatar>
                <ListItemText primary="Read anytime and anywhere." />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: "#FBEEE6",
                  }}
                >
                  <BusinessCenterOutlinedIcon color="primary" />
                </Avatar>
                <ListItemText primary="Smart reading." />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: "#FBEEE6",
                  }}
                >
                  <PeopleOutlinedIcon color="primary" />
                </Avatar>
                <ListItemText primary="Drop reviews and feedbacks while reading" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FutureSection;
