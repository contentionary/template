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
}: {
  title: JSX.Element;
  children: JSX.Element;
  expanded: boolean;
  onClick: Function;
}) {
  return (
    <Accordion expanded={expanded} onClick={() => onClick()}>
      <AccordionSummary
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
