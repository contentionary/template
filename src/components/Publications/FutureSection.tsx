import React from "react";
// next
// mui component
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// app components
import ImageComponent from "@src/components/shared/image";
// icons
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// component and styles
import { bg } from "@src/styles";
import useCardStyle from "@src/styles/card";
//
import { queryClient } from "@src/utils";
import { PublicationsFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const FutureSection: PublicationsFunc = () => {
  const theme = useTheme();
  const cardStyle = useCardStyle();
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
                    backgroundColor: alpha(theme.palette.primary["main"], 0.1),
                  }}
                >
                  <BusinessCenterOutlinedIcon color="primary" />
                </Avatar>
                <Typography
                  my={1}
                  pb={1}
                  variant="h6"
                  sx={{ ...bg().underlinedCurve }}
                >
                  Stay <br /> Knowledgeable
                </Typography>
              </Paper>
              <Box className="breath-img-container">
                <ImageComponent
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
                    backgroundColor: alpha(theme.palette.primary["main"], 0.1),
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
                    backgroundColor: alpha(theme.palette.primary["main"], 0.1),
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
                    backgroundColor: alpha(theme.palette.primary["main"], 0.1),
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
                    backgroundColor: alpha(theme.palette.primary["main"], 0.1),
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
