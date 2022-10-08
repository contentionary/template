import React, { Fragment } from "react";
// mui components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// icons
import TickAvatar from "@src/components/shared/avatar/TickAvatar";
// interface and config
import { CourseInt } from "@src/utils/interface";

const CourseOverview = ({ description, learnings }: CourseInt) => {
  return (
    <Fragment>
      <Typography variant="h5" mb={2}>
        ABOUT THIS COURSE:
      </Typography>
      <Typography paragraph>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </Typography>
      <Typography variant="h5" mb={1}>
        WHAT YOU WILL LEARN
      </Typography>
      <List>
        <Grid container spacing={2}>
          <Grid item md={6}>
            {learnings?.map((learning, index) => (
              <ListItem
                key={`${index}-overview-list`}
                sx={{ px: 0, borderBottom: 1, borderColor: "divider" }}
              >
                <TickAvatar />
                <ListItemText primary={learning} />
              </ListItem>
            ))}
          </Grid>
        </Grid>
      </List>
    </Fragment>
  );
};

export default CourseOverview;
