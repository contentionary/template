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
import UpdatedAt from "@mui/icons-material/CalendarMonthOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Readers from "@mui/icons-material/GroupOutlined";
import Reads from "@mui/icons-material/BookOutlined";
import CreatedAt from "@mui/icons-material/DateRangeOutlined";
// interface and config
import { BookDetailsPageFunc } from "./interfaceType";

const BookStats: BookDetailsPageFunc = ({ publication }) => {
  const { subscriberCount, downloadCount, readCount, createdAt, updatedAt } =
    publication;
  return (
    <Fragment>
      <Typography variant="h5">Book Quick Stats</Typography>
      <List>
        <ListItem sx={{ px: 0 }}>
          <Reads />
          <ListItemText
            primary={`\u00A0 ${
              subscriberCount < 100 ? "Less than 100 " : readCount
            }  reads`}
          />
        </ListItem>

        <ListItem sx={{ px: 0 }}>
          <Readers />
          <ListItemText
            primary={`\u00A0 ${
              subscriberCount < 100 ? "Less than 100 " : subscriberCount
            }  Readers`}
          />
        </ListItem>
        {/* <ListItem sx={{ px: 0 }}>
          <InsertDriveFileOutlinedIcon />
          <ListItemText primary="&nbsp; 256 Pages" />
        </ListItem> */}
        <ListItem sx={{ px: 0 }}>
          <FileDownloadOutlinedIcon />
          <ListItemText
            primary={`\u00A0 ${
              subscriberCount < 100 ? "Less than 100 " : downloadCount
            }  Downloads`}
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

export default BookStats;
