import React, { Fragment } from "react";
import Image from "next/image";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// icons
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
// interface and config
import { LessonPlayerFunc } from "./interfaceType";

const CourseReview: LessonPlayerFunc = () => {
  return (
    <Fragment>
      <List>
        {Array.from({ length: 4 }).map((_, index) => (
          <Fragment key={`${index}-review-list`}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemAvatar sx={{ display: { xs: "none", md: "block" } }}>
                <Avatar
                  sx={{
                    mr: 2,
                    width: 56,
                    height: 56,
                  }}
                >
                  <Image
                    alt="user"
                    layout="fill"
                    objectFit="contain"
                    src="/images/avatar.png"
                  />
                </Avatar>
              </ListItemAvatar>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      mr: 2,
                      width: 56,
                      height: 56,
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <Image
                      alt="user"
                      layout="fill"
                      objectFit="contain"
                      src="/images/avatar.png"
                    />
                  </Avatar>
                  <Box sx={{ ml: "0 !important" }}>
                    <Typography variant="h6" mb={1}>
                      Brunch Malt Flint
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography paragraph color="primary.light" mb={0}>
                        <StarOutlinedIcon />
                        <StarOutlinedIcon />
                        <StarOutlinedIcon />
                        <StarHalfOutlinedIcon />
                        <StarOutlineOutlinedIcon />
                      </Typography>
                      <Typography paragraph mb={0} mt="0 !important">
                        {index + 2} months ago
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Fragment>
                  <Typography paragraph mb={0}>
                    Max is very clear on the explanation of the content. The
                    course is very complete with the exception of User
                    Authentication, which is a key area that is not covered.
                  </Typography>
                </Fragment>
              </Box>
            </ListItem>
            <Divider component="li" />
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default CourseReview;
