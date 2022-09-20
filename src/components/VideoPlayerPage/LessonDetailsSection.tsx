import React, { Fragment } from "react";
// next
// import Image from "next/image";
// import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
// app component
import CourseReview from "./CourseReview";
import LessonOverview from "./LessonOverview";
import LessonDiscussions from "./LessonDiscussions";
import UnderConstruction from "@src/components/shared/UnderConstruction";
// interface, styles and config
// import config from "@src/utils/config";
import useTabStyle from "@src/styles/tab";
import { queryClient } from "@src/pages";
import { BasePageProps, CourseInt } from "../../utils/interface";

const LessonDetailsSection = () => {
  const [value, setValue] = React.useState("1");
  const tabStyle = useTabStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courseDetails = pageData.courseDetails as CourseInt;
  //
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //
  const px = { xs: 1, md: 4, lg: 3, xl: 0 };

  return (
    <Fragment>
      <Box
        borderTop={1}
        component="section"
        borderColor="divider"
        sx={{ pb: 8 }}
      >
        <TabContext value={value}>
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
                <Tab label="Lesson Discussions" value="2" />
                <Tab label="Course Settings" value="3" />
                <Tab label="Certificate Manager" value="4" />
                <Tab label="Subscribers" value="5" />
                <Tab label="Reviews" value="6" />
              </TabList>
            </Container>
          </Box>
          <Box>
            <Container maxWidth="xl" sx={{ px: { sm: 4, md: 6, xl: 3 } }}>
              <TabPanel value="1" sx={{ px: px }}>
                <LessonOverview
                  description={courseDetails.description}
                  learnings={courseDetails.learnings}
                />
              </TabPanel>
              <TabPanel value="2" sx={{ px: px }}>
                <LessonDiscussions />
              </TabPanel>
              <TabPanel value="3" sx={{ px: px }}>
                <Typography variant="h4" textAlign="center">
                  Course Settings
                </Typography>
                <UnderConstruction />
              </TabPanel>
              <TabPanel value="4" sx={{ px: px }}>
                <Typography variant="h4" textAlign="center">
                  Certificate Manager
                </Typography>
                <UnderConstruction />
              </TabPanel>
              <TabPanel value="5" sx={{ px: px }}>
                <Typography variant="h4" textAlign="center">
                  Subscribers
                </Typography>
                <UnderConstruction />
              </TabPanel>
              <TabPanel value="6" sx={{ px: px }}>
                <CourseReview />
              </TabPanel>
            </Container>
          </Box>
        </TabContext>
      </Box>
    </Fragment>
  );
};
export default LessonDetailsSection;
