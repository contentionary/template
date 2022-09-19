import React, { Fragment } from "react";
// mui components
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// icons
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SettingsCellOutlinedIcon from "@mui/icons-material/SettingsCellOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
// interface and config
import { BookDetailsPageFunc } from "./interfaceType";

const BookStats: BookDetailsPageFunc = () => {
  return (
    <Fragment>
      <Typography variant="h5">This Book includes:</Typography>
      <List>
        <ListItem sx={{ px: 0 }}>
          <OndemandVideoOutlinedIcon />
          <ListItemText primary="&nbsp; 23k read hours accumulated" />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <InsertDriveFileOutlinedIcon />
          <ListItemText primary="&nbsp; 256 Pages" />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <FileDownloadOutlinedIcon />
          <ListItemText primary="&nbsp; 1 downloadable resource" />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <AllInclusiveOutlinedIcon />
          <ListItemText primary="&nbsp; Full lifetime access" />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <SettingsCellOutlinedIcon />
          <ListItemText primary="&nbsp; Access on mobile" />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <EmojiEventsOutlinedIcon />
          <ListItemText primary="&nbsp; Certificate of completion" />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default BookStats;
