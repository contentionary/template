import React from "react";
// next
import Image from "next/image";
import NextLink from "next/link";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
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
import { AcademyFunc } from "./interfaceType";

const FutureSection: AcademyFunc = () => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Box
      className=""
      component="section"
      sx={{ py: 8, px: { md: 6 }, bgcolor: "#FFFCF8" }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" component="h4" mb={4}>
          Be Ready for the Future
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
                  my={2}
                  variant="h5"
                  color="primary"
                  className={globalStyle.underlinedCurve}
                >
                  Get Certified
                </Typography>
              </Paper>
              <Box className="breath-img-container">
                <Image
                  layout="fill"
                  alt="yes we can"
                  objectFit="cover"
                  objectPosition="right"
                  src="/images/courses-4.png"
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
            <NextLink href="/" passHref>
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
                className={globalStyle.bgGradient}
                sx={{
                  textAlign: "center",
                  width: { xs: "100%", md: "auto" },
                  display: { xs: "block", md: "inline-block" },
                }}
              >
                Try Premium Centres
              </Button>
            </NextLink>{" "}
            <NextLink href="/" passHref>
              <Button
                size="large"
                variant="outlined"
                component={MuiLink}
                sx={{
                  textAlign: "center",
                  mt: { xs: 2, md: 0 },
                  textDecoration: "underline",
                  borderWidth: { xs: 2, md: 0 },
                  ":hover": {
                    borderWidth: { xs: 2, md: 0 },
                  },
                  width: { xs: "100%", md: "auto" },
                  display: { xs: "block", md: "inline-block" },
                }}
              >
                Learn more
              </Button>
            </NextLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FutureSection;
