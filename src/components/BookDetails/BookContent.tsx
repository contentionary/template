import React, { Fragment } from "react";
// next
// mui components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// icons
import TickAvatar from "@src/components/shared/TickAvatar";
// interface, styles and config
import { BookDetailsPageFunc } from "./interfaceType";

const BookContent: BookDetailsPageFunc = ({ learnings }) => {
  return (
    <Fragment>
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

export default BookContent;