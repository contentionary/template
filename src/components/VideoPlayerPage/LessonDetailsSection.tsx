import React, { Fragment } from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
// import config from "@src/utils/config";
import useTabStyle from "@src/styles/tab";
import { CourseContentInt } from "../../utils/interface";
import LessonDiscussions from "@src/components/shared/review";

interface Props {
  courseContent: CourseContentInt;
}

const LessonDetailsSection = ({ courseContent }: Props) => {
  const [value, setValue] = React.useState("1");
  const tabStyle = useTabStyle();
  //
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { id, description } = courseContent;

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
                className={`${tabStyle.appTab} tab-justify-start`}
              >
                <Tab label="Overview" value="1" />
                <Tab label="Lesson Discussions" value="2" />
              </TabList>
            </Container>
          </Box>
          <Box>
            <Container maxWidth="xl" sx={{ px: { sm: 4, md: 6, xl: 3 } }}>
              <TabPanel value="1" sx={{ px: px }}>
                {description}
              </TabPanel>
              <TabPanel value="2" sx={{ px: px }}>
                <LessonDiscussions
                  contentId={id}
                  isSubscriber={true}
                  allowReview={true}
                  allowRating={false}
                />
              </TabPanel>
            </Container>
          </Box>
        </TabContext>
      </Box>
    </Fragment>
  );
};
export default LessonDetailsSection;
