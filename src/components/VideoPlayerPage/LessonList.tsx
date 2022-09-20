import React from "react";
// next
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// simplebar
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
// icons
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
// interface props, styles and config
import { LessonListFunc } from "./interfaceType";
import useAccordionStyle from "@src/styles/accordion";
import { queryClient } from "@src/pages";
import { BasePageProps, CourseModuleInt } from "../../utils/interface";
import ContentListButton from "../CourseDetails/ContentListButton";

const LessonList: LessonListFunc = () => {
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const accordionStyle = useAccordionStyle();
  const router = useRouter();
  const { slug, courseId } = router.query;

  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courseContents = pageData.courseDetails
    .contents as Array<CourseModuleInt>;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box component={SimpleBar} className="list-content">
      <List disablePadding>
        {courseContents.map((courseContent, index) => {
          const { name, contents, isModule } = courseContent;

          if (isModule)
            return (
              <ListItem disablePadding key={index + "list"}>
                <Accordion
                  key={`${index + 1}-content-list`}
                  elevation={0}
                  disableGutters
                  expanded={expanded === `${index + 1}`}
                  onChange={handleChange(`${index + 1}`)}
                  className={accordionStyle.appAccordion}
                  style={{ width: "100%" }}
                >
                  <AccordionSummary
                    expandIcon={<ChevronRightOutlinedIcon />}
                    aria-controls={`content-list-${index + 1}`}
                    id={`content-list-${index + 1}`}
                  >
                    <Stack flexGrow={1} direction={{ xs: "column", md: "row" }}>
                      <Stack
                        flexGrow={1}
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                      >
                        <Typography variant="h6">{name}</Typography>
                        <Typography
                          color="text.secondary"
                          display={{ xs: "none", md: "block" }}
                        >
                          7 Lectures &middot; 34min
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {contents.map((content, index) => {
                        return (
                          <ListItem key={`${index}-video-list`} disablePadding>
                            <ContentListButton
                              courseId={courseId}
                              slug={slug}
                              {...content}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            );

          return (
            <ListItem key={`${courseContent.id}-video-list`} disablePadding>
              <ContentListButton
                courseId={courseId}
                slug={slug}
                {...courseContent}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default LessonList;
