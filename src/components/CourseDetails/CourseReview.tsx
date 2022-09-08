import React, { Fragment } from "react";
import Image from "next/image";
// mui components
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// icons
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
// interface and config
import { CourseDetailsPageFunc } from "./interfaceType";

const CourseReview: CourseDetailsPageFunc = () => {
  return (
    <Fragment>
      <List>
        {Array.from({ length: 2 }).map((_, index) => (
          <Fragment key={`${index}-video-list`}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                  <Image
                    alt="user"
                    layout="fill"
                    objectFit="contain"
                    src="/images/avatar.png"
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" mb={1}>
                    Brunch Malt Flint
                  </Typography>
                }
                secondary={
                  <Fragment>
                    <Stack direction="row" spacing={1}>
                      <Typography paragraph color="primary.light" mb={0}>
                        <StarOutlinedIcon />
                        <StarOutlinedIcon />
                        <StarOutlinedIcon />
                        <StarHalfOutlinedIcon />
                        <StarOutlineOutlinedIcon />
                      </Typography>
                      <Typography paragraph>3 months ago</Typography>
                    </Stack>
                    <Typography paragraph mb={0}>
                      Max is very clear on the explanation of the content. The
                      course is very complete with the exception of User
                      Authentication, which is a key area that is not covered.
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default CourseReview;
