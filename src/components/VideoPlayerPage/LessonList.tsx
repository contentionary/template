import React from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
// simplebar
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
// icons
import PlayIcon from "@src/assets/icons/play.svg";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
// interface props, styles and config
import { LessonListFunc } from "./interfaceType";
import useAccordionStyle from "@src/styles/accordion";

const LessonList: LessonListFunc = () => {
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const accordionStyle = useAccordionStyle();
  const router = useRouter();
  const { slug } = router.query;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box component={SimpleBar} className="list-content">
      {Array.from({ length: 5 }).map((_, index) => (
        <Accordion
          square
          elevation={0}
          disableGutters
          key={`${index + 1}-content-list`}
          expanded={expanded === `${index + 1}`}
          onChange={handleChange(`${index + 1}`)}
          className={`${accordionStyle.appAccordion} flush`}
        >
          <AccordionSummary
            id={`content-list-${index + 1}`}
            expandIcon={<ChevronRightOutlinedIcon />}
            aria-controls={`content-list-${index + 1}`}
            sx={{ px: 0, flexDirection: "row !important" }}
          >
            <Typography variant="h6">
              Introduction to the project of designing
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ py: 0 }}>
              {Array.from({ length: 2 }).map((_, index) => (
                <ListItem key={`${index}-video-list`} disablePadding>
                  <NextLink href={`/courses/${slug}/lesson/${index}`} passHref>
                    <ListItemButton LinkComponent={MuiLink}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <PlayIcon
                          fill="secondary.main"
                          style={{ transform: "scale(0.75)" }}
                        />
                      </ListItemIcon>
                      <Typography variant="body2" mb={0}>
                        <strong>Video</strong>: Introduction to th project of
                        designing
                      </Typography>
                    </ListItemButton>
                  </NextLink>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <KeyboardVoiceOutlinedIcon />
                  </ListItemIcon>
                  <Typography variant="body2" mb={0}>
                    <strong>Audio</strong>: Introduction to th project of
                    designing
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <AutoStoriesOutlinedIcon />
                  </ListItemIcon>
                  <Typography variant="body2" mb={0}>
                    <strong>Document</strong>: Introduction to th project of
                    designing
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <ReceiptLongOutlinedIcon />
                  </ListItemIcon>
                  <Typography variant="body2" mb={0}>
                    <strong>Exam</strong>: Introduction to th project of
                    designing
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default LessonList;
