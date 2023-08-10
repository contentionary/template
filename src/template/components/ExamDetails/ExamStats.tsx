import React, { Fragment } from "react";
// mui components
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//Date-fn
import { format } from "date-fns";
// icons
import Readers from "@mui/icons-material/GroupOutlined";
import CreatedAt from "@mui/icons-material/DateRangeOutlined";
import UpdatedAt from "@mui/icons-material/CalendarMonthOutlined";
// interface and config
import { ExamDetailsPageFunc } from "./interfaceType";

const ExamStats: ExamDetailsPageFunc = ({ exam }) => {
  const { subscriberCount, createdAt } = exam;
  return (
    <Fragment>
      <Typography variant="h5">Exam Quick Stats</Typography>
      <List>
        <ListItem sx={{ px: 0 }}>
          <Readers />
          <ListItemText
            primary={`\u00A0 ${
              subscriberCount < 100 ? "Less than 100 " : subscriberCount
            }  Exam takers`}
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <CreatedAt />
          <ListItemText
            primary={`\u00A0 Created on ${format(
              new Date(createdAt),
              "dd-MM-yyy"
            )}`}
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <UpdatedAt />
          <ListItemText
            primary={`\u00A0 Last updated on ${format(
              new Date(createdAt),
              "dd-MM-yyy"
            )}`}
          />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default ExamStats;
