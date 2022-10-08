import React from "react";
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
import useGlobalStyle from "@src/styles/index";
import { BasePageProps, CourseInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";

const DetailsSection = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const [value, setValue] = React.useState("1");
  const tabStyle = useTabStyle();
  const globalStyle = useGlobalStyle();

  const course = pageData?.courseDetails as CourseInt;

  //
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
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
            <Container maxWidth="xl" sx={{ px: { sm: 4, md: 6, xl: 3 } }}>
              <Grid container spacing={{ xs: 2, xl: 0 }}>
                <Grid item xs={12} md={8} xl={9}>
                  <TabPanel
                    value="1"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <CourseOverview {...pageData.courseDetails} />
                  </TabPanel>
                  <TabPanel
                    value="2"
                    sx={{ px: { xs: 0, md: 4, lg: 3, xl: 0 } }}
                  >
                    <CourseContent courseContents={course.contents || []} />
                  </TabPanel>
                  <TabPanel
                    value="3"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <Typography variant="h4" textAlign="center">
                      Course Settings
                    </Typography>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel
                    value="4"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <Typography variant="h4" textAlign="center">
                      Certificate Manager
                    </Typography>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel
                    value="5"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <Typography variant="h4" textAlign="center">
                      Subscribers
                    </Typography>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel
                    value="6"
                    sx={{ px: { xs: 1, md: 4, lg: 3, xl: 0 } }}
                  >
                    <CourseReview />
                  </TabPanel>
                </Grid>
                <Grid item xs={12} md={4} xl={3}>
                  <Box
                    p={3}
                    mt={3}
                    top="2rem"
                    borderRadius={3}
                    position="sticky"
                    className={globalStyle.paperShadow}
                  >
                    <CourseStats {...course} />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </TabContext>
      </Box>
    </>
  );
};
export default DetailsSection;
