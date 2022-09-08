import React, { Fragment } from "react";
// mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
            <Typography variant="h5" sx={{ width: "100px", flexShrink: 0 }}>
              Module {`${index + 1}`}
            </Typography>
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">
                Introduction to the project of designing
              </Typography>
              <Typography color="text.secondary">
                7 Lectures &middot; 34min
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {Array.from({ length: 2 }).map((_, index) => (
                <ListItem key={`${index}-video-list`} disablePadding>
                  <ListItemButton>
                    <PlayIcon
                      fill="secondary.main"
                      style={{ transform: "scale(0.75)" }}
                    />
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography paragraph mb={0}>
                            &nbsp; Video: Introduction to th project of
                            designing
                          </Typography>
                          <Typography paragraph mb={0}>
                            25:04
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton>
                  <KeyboardVoiceOutlinedIcon />
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography paragraph mb={0}>
                          &nbsp; Audio: Introduction to th project of designing
                        </Typography>
                        <Typography paragraph mb={0}>
                          25:04
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <AutoStoriesOutlinedIcon />
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography paragraph mb={0}>
                          &nbsp; Document: Introduction to th project of
                          designing
                        </Typography>
                        <Typography paragraph mb={0}>
                          56 pages
                        </Typography>
                      </Stack>
                    }
                  />
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
