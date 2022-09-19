import React, { Fragment } from "react";
// mui components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// icons
import TickAvatar from "@src/components/shared/TickAvatar";
// interface and config
import { CourseInt } from "@src/utils/interface";

const CourseOverview = ({ description, learnings }: CourseInt) => {
  return (
    <Fragment>
      <Typography variant="h5" mb={2}>
        ABOUT THIS COURSE:
      </Typography>
      <Typography paragraph>{description}</Typography>
      {/* <Typography variant="h5" mb={1}>
        Aim of the course:
      </Typography>
      <Typography paragraph mb={3}>
        some schools already had all it takes to still continue their curriculum
        through adopted technologies.But in as much as the pandemic became
        intense, some schools
      </Typography> */}
      <Typography variant="h5" mb={1}>
        WHAT YOU WILL LEARN
      </Typography>
      <List>
        <Grid container spacing={2}>
          <Grid item md={6}>
            {learnings.map((learning, index) => (
              <ListItem
                key={`${index}-overview-list`}
                sx={{ px: 0, borderBottom: 1, borderColor: "divider" }}
              >
                <TickAvatar />
                <ListItemText primary={learning} />
              </ListItem>
            ))}
          </Grid>
          <Grid item md={6}>
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItem
                key={`${index}-overview-list`}
                sx={{ px: 0, borderBottom: 1, borderColor: "divider" }}
              >
                <TickAvatar />
                <ListItemText primary="What are the things you want to learn that’s causing problem" />
              </ListItem>
            ))}
          </Grid>
        </Grid>
      </List>
    </Fragment>
  );
};

export default CourseOverview;
