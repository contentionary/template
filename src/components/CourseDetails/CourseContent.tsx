import React, { Fragment } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
// interface, styles and config
import useAccordionStyle from "@src/styles/accordion";
import { CourseDetailsPageFunc } from "./interfaceType";

const CourseContent: CourseDetailsPageFunc = () => {
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const accordionStyle = useAccordionStyle();
  const router = useRouter();
  const { slug } = router.query;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Fragment>
      {Array.from({ length: 5 }).map((_, index) => (
        <Accordion
          key={`${index + 1}-content-list`}
          elevation={0}
          disableGutters
          expanded={expanded === `${index + 1}`}
          onChange={handleChange(`${index + 1}`)}
          className={accordionStyle.appAccordion}
        >
          <AccordionSummary
            expandIcon={<ChevronRightOutlinedIcon />}
            aria-controls={`content-list-${index + 1}`}
            id={`content-list-${index + 1}`}
          >
            <Stack flexGrow={1} direction={{ xs: "column", md: "row" }}>
              <Typography variant="h5" sx={{ width: "100px", flexShrink: 0 }}>
                Module {`${index + 1}`}
              </Typography>
              <Stack
                flexGrow={1}
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
              >
                <Typography variant="h6">
                  Introduction to the project of designing
                </Typography>
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
              {Array.from({ length: 2 }).map((_, index) => (
                <ListItem key={`${index}-video-list`} disablePadding>
                  <NextLink href={`/courses/${slug}/lesson/${index}`} passHref>
                    <ListItemButton LinkComponent={MuiLink}>
                      <ListItemIcon>
                        <PlayIcon
                          fill="secondary.main"
                          style={{ transform: "scale(0.75)" }}
                        />
                      </ListItemIcon>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                      >
                        <Typography paragraph mb={0}>
                          Video: Introduction to th project of designing
                        </Typography>
                        <Typography paragraph mb={0}>
                          25:04
                        </Typography>
                      </Stack>
                    </ListItemButton>
                  </NextLink>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <KeyboardVoiceOutlinedIcon />
                  </ListItemIcon>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                  >
                    <Typography paragraph mb={0}>
                      Audio: Introduction to th project of designing
                    </Typography>
                    <Typography paragraph mb={0}>
                      25:04
                    </Typography>
                  </Stack>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AutoStoriesOutlinedIcon />
                  </ListItemIcon>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                  >
                    <Typography paragraph mb={0}>
                      Document: Introduction to th project of designing
                    </Typography>
                    <Typography paragraph mb={0}>
                      56 pages
                    </Typography>
                  </Stack>
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Fragment>
  );
};

export default CourseContent;
