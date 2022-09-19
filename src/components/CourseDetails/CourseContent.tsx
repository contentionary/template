import React from "react";
// next
// import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// interface, styles and config
import useAccordionStyle from "@src/styles/accordion";
import { CourseModuleInt } from "@src/utils/interface";
import ContentListButton from "./ContentListButton";

const CourseContent = ({
  courseContents,
}: {
  courseContents: Array<CourseModuleInt>;
}) => {
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const accordionStyle = useAccordionStyle();
  const router = useRouter();
  const { slug } = router.query;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
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
                    {contents.map((content, index) => (
                      <ListItem key={`${index}-video-list`} disablePadding>
                        <ContentListButton
                          slug={slug}
                          index={index}
                          {...content}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );

        return (
          <ListItem key={`${90}-video-list`} disablePadding>
            <ContentListButton slug={slug} index={index} {...courseContent} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CourseContent;
