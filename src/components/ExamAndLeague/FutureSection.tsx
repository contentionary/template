import React from "react";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";
// app components
import ImageComponent from "@src/components/shared/image";
// icons
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// component and styles
import useCardStyle from "@src/styles/card";
//
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const FutureSection = () => {
  const theme = useTheme();
  const cardStyle = useCardStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const contents =
    pageData?.templateData?.templateDetails?.landingPageSectionTwo?.contents;
  return (
    <Box
      className=""
      component="section"
      sx={{
        py: 8,
        px: { md: 6 },
        backgroundColor: alpha(theme.palette.primary["main"], 0.02),
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" component="h4" mb={4}>
          {contents && contents[0].title}
        </Typography>
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item md={4} xs={12}>
            <Box className={cardStyle.breathCard}>
              <Box className="breath-img-container">
                <ImageComponent
                  layout="fill"
                  alt="yes we can"
                  objectFit="cover"
                  objectPosition="right"
                  src={contents && contents[0].imageUrl}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography variant="h3" component="h2">
              Stay Ahead and Compete Globally
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
                <ListItemText primary="Top Learning Contents thought by experts" />
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
                <ListItemText primary="Learn at your own pace" />
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
                <ListItemText primary="Ask questions while learning" />
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
                <ListItemText primary="Inbuilt Test and exercises while learning" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FutureSection;
