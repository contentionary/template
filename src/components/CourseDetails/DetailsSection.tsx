import React, { Fragment } from "react";
// next
// import Image from "next/image";
// import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
// app component
import CourseStats from "./CourseStats";
import CourseReview from "./CourseReview";
import CourseContent from "./CourseContent";
import CourseOverview from "./CourseOverview";
import UnderConstruction from "@src/components/shared/UnderConstruction";
// interface, styles and config
// import config from "@src/utils/config";
import useTabStyle from "@src/styles/tab";
import { CourseDetailsPageFunc } from "./interfaceType";

const DetailsSection: CourseDetailsPageFunc = () => {
  const [value, setValue] = React.useState("1");
  const tabStyle = useTabStyle();

  //
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Box
        borderTop={1}
        component="section"
        borderColor="divider"
        sx={{ pb: 8 }}
      >
        <TabContext value={value}>
          <Box>
            <Box
              top={0}
              zIndex={2}
              bgcolor="white"
              position="sticky"
              borderBottom={1}
              borderColor="divider"
              sx={{ px: { md: 6 } }}
            >
              <Container maxWidth="xl" sx={{ mb: -0.3 }}>
                <TabList
                  onChange={handleChange}
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  aria-label="lab API tabs example"
                  className={tabStyle.appTab}
                >
                  <Tab label="Overview" value="1" />
                  <Tab label="Course Content" value="2" />
                  <Tab label="Course Settings" value="3" />
                  <Tab label="Certificate Manager" value="4" />
                  <Tab label="Subscribers" value="5" />
                  <Tab label="Reviews" value="6" />
                </TabList>
              </Container>
            </Box>
            <Container maxWidth="xl" sx={{ px: { md: 6 } }}>
              <Grid container spacing={2}>
                <Grid item md={8} xl={9}>
                  <TabPanel value="1">
                    <CourseOverview />
                  </TabPanel>
                  <TabPanel value="2">
                    <CourseContent />
                  </TabPanel>
                  <TabPanel value="3">
                    <Typography variant="h4" textAlign="center">
                      Course Settings
                    </Typography>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel value="4">
                    <Typography variant="h4" textAlign="center">
                      Certificate Manager
                    </Typography>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel value="5">
                    <Typography variant="h4" textAlign="center">
                      Subscribers
                    </Typography>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel value="6">
                    <CourseReview />
                  </TabPanel>
                </Grid>
                <Grid item md={4} xl={3}>
                  <Box pt={3}>
                    <CourseStats />
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
