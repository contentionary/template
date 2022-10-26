import React from "react";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
import useCardStyle from "@src/styles/card";
//
import { queryClient } from "@src/utils";
import { ExamFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const FutureSection: ExamFunc = () => {
  const cardStyle = useCardStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { imageUrl, title } =
    pageData?.templateData?.templateDetails.landingPageSectionTwo.contents[1];

  return (
    <Box
      className=""
      component="section"
      sx={{ py: 8, px: { md: 6 }, bgcolor: "#FFFCF8" }}
    >
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
              Stay Ahead and Compete Globally
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
                <ListItemText primary="Top Learning Contents thought by experts" />
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
                <ListItemText primary="Learn at your own pace" />
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
                <ListItemText primary="Ask questions while learning" />
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
