import React, { Fragment, useState } from "react";
import Image from "next/image";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
//
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// icons
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
// interface, styles and config
// import { LessonPlayerFunc } from "./interfaceType";

const LessonDiscussions = () => {
  const [open, setOpen] = useState<string>("");
  //
  const handleToggleReply = (discussion: string) => {
    if (open === discussion) setOpen("");
    else setOpen(discussion);
  };

  return (
    <Fragment>
      <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
        <InputLabel htmlFor="note">What’s on your mind?</InputLabel>
        <Input
          id="note"
          type="text"
          sx={{ py: 1 }}
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained">Submit</Button>
            </InputAdornment>
          }
        />
      </FormControl>
      <List>
        {Array.from({ length: 4 }).map((_, index) => (
          <Fragment key={`${index}-note-list`}>
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
                    <Stack direction="row" spacing={1}>
                      <Box>
                        <Typography variant="h6" mb={0}>
                          Emmanuel Clinton
                        </Typography>
                        <Typography paragraph mb={0}>
                          {index + 2} months ago
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
                <Typography paragraph mb={1}>
                  What are the things you want to learn that’s causing problem
                  for you? Please state it so that we can resolve all of it
                  inside this course.
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Button color="secondary" variant="text" size="large">
                    <ReplyOutlinedIcon color="primary" /> Reply
                  </Button>
                  <Button
                    size="large"
                    variant="text"
                    color="secondary"
                    onClick={() => handleToggleReply(`${index}`)}
                  >
                    {open === `${index}` ? "Hide" : "View"} 4 replies
                  </Button>
                </Stack>
              </Box>
            </ListItem>
            <Divider component="li" />
            <Collapse in={open === `${index}`} timeout="auto" unmountOnExit>
              {Array.from({ length: 4 }).map((_, index) => (
                <Fragment key={`${index}-note-reply`}>
                  <List disablePadding>
                    <ListItem alignItems="flex-start" sx={{ pr: 0, pl: 4 }}>
                      <ListItemAvatar
                        sx={{ display: { xs: "none", md: "block" } }}
                      >
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
                            <Stack direction="row" spacing={1}>
                              <Box>
                                <Typography variant="h6" mb={0}>
                                  David Richard
                                </Typography>
                                <Typography paragraph mb={0}>
                                  {index + 2} months ago
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        </Stack>
                        <Typography paragraph mb={1}>
                          What are the things you want to learn that’s causing
                          problem for you? Please state it so that we can
                          resolve all of it inside this course.
                        </Typography>
                        <Stack direction="row" justifyContent="space-between">
                          <Button color="secondary" variant="text" size="large">
                            <ReplyOutlinedIcon color="primary" /> Reply
                          </Button>
                        </Stack>
                        <Divider component="li" />
                      </Box>
                    </ListItem>
                  </List>
                </Fragment>
              ))}
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default LessonDiscussions;
