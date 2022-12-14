import { makeStyles } from "@mui/styles";
import { theme } from "./theme";

const accordionStyle = makeStyles({
  appAccordionList: {
    "&.MuiList-root": {
      "& .MuiListItem-root:not(:last-child) .MuiAccordion-root": {
        borderBottom: 0,
      },
    },
  },
  appAccordion: {
    "&.MuiAccordion-root": {
      border: `1px solid ${theme().palette.divider}`,
      "&.flush": {
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
      },
      "&:before": {
        display: "none",
      },
      "&.MuiAccordion-gutters": {},
      "& .MuiAccordionSummary-root": {
        backgroundColor: "rgba(0, 0, 0, .03)",
        flexDirection: "row-reverse",
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          transform: "rotate(90deg)",
        },
        "& .MuiAccordionSummary-content": {
          marginLeft: theme().spacing(1),
        },
      },
      "& .MuiAccordionDetails-root": {
        padding: theme().spacing(0),
        borderTop: `1px solid ${theme().palette.divider}`,
      },
    },
  },
});

export default accordionStyle;
