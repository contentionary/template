import React, { Fragment } from "react";
// mui components
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// icons
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import SubscriberIcon from "@mui/icons-material/PeopleAltOutlined";
import AudionIcon from "@mui/icons-material/AudioFileOutlined";
import DocumentIcon from "@mui/icons-material/DocumentScannerOutlined";
// interface and config
import { CourseInt } from "@src/utils/interface";

const CourseStats = ({ courseContentStats, subscriberCount }: CourseInt) => {
  return (
    <Fragment>
      <Typography variant="h5">This course includes:</Typography>
      <List>
        <ListItem sx={{ px: 0 }}>
          <OndemandVideoOutlinedIcon />
          <ListItemText
            primary={`\u00A0 ${courseContentStats.videoCount} on-demand videos`}
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <DocumentIcon />
          <ListItemText
            primary={`\u00A0 ${
              courseContentStats.documentCount || "No"
            } documents`}
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <AudionIcon />
          <ListItemText
            primary={`\u00A0 ${courseContentStats.audioCount || "No"} audios`}
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <SubscriberIcon />
          <ListItemText
            primary={`\u00A0 ${
              subscriberCount < 100 ? "Less than 100 " : subscriberCount
            }  Subscribers`}
          />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default CourseStats;
