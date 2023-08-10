import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import DateRangeOutlined from "@mui/icons-material/DateRangeOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
//Date-fn
import { format } from "date-fns";
// interface and config
import { LeagueDetailsPageFunc } from "./interfaceType";
import { dateTimeFormat } from "@src/utils";

const LeagueStats: LeagueDetailsPageFunc = ({ league }) => {
  const { subscriberCount, endDate, startDate, examCount } = league;
  const stat = [
    {
      icon: <NoteAltOutlinedIcon sx={{ fontSize: 16 }} />,
      name: "No of Exams:",
      value: examCount,
    },
    {
      icon: <PeopleAltOutlined sx={{ fontSize: 16 }} />,
      name: "No of Participants:",
      value: subscriberCount,
    },
    {
      icon: <DateRangeOutlined sx={{ fontSize: 16 }} />,
      name: "Start Date:",
      value: dateTimeFormat(startDate),
    },
    {
      icon: <DateRangeOutlined sx={{ fontSize: 16 }} />,
      name: "End Date:",
      value: dateTimeFormat(endDate),
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 16 }} />,
      name: "Start Time:",
      value: format(new Date(startDate), "h:mm a"),
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 16 }} />,
      name: "End Time:",
      value: format(new Date(endDate), "h:mm a"),
    },
  ];
  return (
    <Fragment>
      {stat.map(({ icon, name, value }, index) => (
        <Box
          key={`league-stats-item-${index}`}
          sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
        >
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            {icon} &nbsp; {name}
          </Typography>
          <Typography>{value}</Typography>
        </Box>
      ))}
    </Fragment>
  );
};

export default LeagueStats;
