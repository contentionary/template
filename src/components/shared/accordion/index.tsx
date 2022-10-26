import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({
  title,
  children,
  expanded,
  onClick,
  sx,
}: {
  title: JSX.Element;
  children: JSX.Element;
  expanded: boolean;
  onClick: Function;
  sx?: {};
}) {
  return (
    <Accordion sx={sx} expanded={expanded}>
      <AccordionSummary
        onClick={() => onClick()}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
