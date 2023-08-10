import React, { Fragment } from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
//
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
// app component
import LeagueStats from "./LeagueStats";
import AboutLeague from "./AboutLeague";
import LeagueExams from "./LeagueExams";
// interface, styles and config
import useTabStyle from "@src/template/styles/tab";
import useGlobalStyle from "@src/template/styles/index";
import { LeagueDetailsPageFunc } from "./interfaceType";
import LeagueTable from "./LeagueTable";
import LeagueActivities from "./LeagueActivities";
import LeagueParticipants from "./LeagueParticipants";
import LeagueReview from "@src/template/components/shared/review";

const DetailsSection: LeagueDetailsPageFunc = (props) => {
  const [value, setValue] = React.useState("1");
  const tabStyle = useTabStyle();
  const globalStyle = useGlobalStyle();
  //
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Box component="section" sx={{ pb: 8 }}>
        <TabContext value={value}>
          <Box>
            <Box
              top={0}
              zIndex={2}
              bgcolor="white"
              position="sticky"
              sx={{ px: { md: 6 } }}
              className={globalStyle.paperShadowSm}
            >
              <Container maxWidth="xl" sx={{ mb: -0.3 }}>
                <TabList
                  onChange={handleChange}
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  aria-label="Publication tab contents"
                  className={`${tabStyle.appTab} tab-justify-start`}
                >
                  <Tab label="About" value="1" />
                  <Tab label="Exams" value="2" />
                  <Tab label="Table" value="3" />
                  <Tab label="Activities" value="4" />
                  <Tab label="Participants" value="5" />
                  <Tab label="Discussions" value="6" />
                </TabList>
              </Container>
            </Box>
            <Container maxWidth="xl" sx={{ px: { sm: 4, md: 6, xl: 3 } }}>
              <Grid container spacing={{ xs: 2, md: 5 }}>
                <Grid item xs={12} md={8} xl={9}>
                  <TabPanel
                    value="1"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <AboutLeague {...props} />
                  </TabPanel>
                  <TabPanel
                    value="2"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <LeagueExams {...props} />
                  </TabPanel>
                  <TabPanel
                    value="3"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <LeagueTable {...props} />
                  </TabPanel>
                  <TabPanel
                    value="4"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <LeagueActivities {...props} />
                  </TabPanel>
                  <TabPanel
                    value="5"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <LeagueParticipants {...props} />
                  </TabPanel>
                  <TabPanel
                    value="6"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <LeagueReview
                      isSubscriber={Boolean(
                        props.auth?.isCentreManager ||
                          props.auth?.isLeagueSubscriber
                      )}
                      contentId={props.league.id}
                      allowReview={true}
                    />
                  </TabPanel>
                </Grid>
                <Grid item xs={12} md={4} xl={3}>
                  <Box
                    p={3}
                    mt={5}
                    top="2rem"
                    borderRadius={3}
                    position="sticky"
                    className={globalStyle.paperShadowSm}
                  >
                    <LeagueStats {...props} />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default DetailsSection;
