import React, { useState } from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// icons
import StarIcon from "@mui/icons-material/Star";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
// app components
import ReviewForm from "./ReviewForm";
import UserAvatar from "@src/components/shared/avatar/UserAvatar";
// style and interface
import useButtonStyle from "@src/styles/button";
import { ReviewInt } from "@src/utils/interface";
import { timeAgo } from "@src/utils";

interface ReviewItemProps {
  reply?: boolean;
  review: ReviewInt;
  openReply?: string;
  // eslint-disable-next-line no-unused-vars
  handleToggleReply?: (discussion: string) => void;
}

const ReviewItem = ({
  reply,
  review,
  openReply,
  handleToggleReply,
}: ReviewItemProps) => {
  const buttonStyle = useButtonStyle();
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <ListItem alignItems="flex-start" sx={{ pr: 0, pl: reply ? 4 : 0 }}>
      <ListItemAvatar sx={{ display: { xs: "none", md: "block" } }}>
        <UserAvatar
          src={review.avatar}
          sx={{ mr: 2 }}
          user={{ firstname: review.firstname, lastname: review.surname }}
        />
      </ListItemAvatar>
      <Box flexGrow={1}>
        <Stack direction="row" spacing={2}>
          <UserAvatar
            src={review.avatar}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            user={{ firstname: review.firstname, lastname: review.surname }}
          />
          <Box sx={{ ml: "0 !important" }}>
            <Stack direction="row" spacing={1}>
              <Box>
                <Typography variant="h6" mb={0}>
                  {review.firstname} {review.surname}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Rating
                    name="text-feedback"
                    value={review.rating}
                    readOnly
                    precision={1}
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "primary.light",
                      },
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Typography paragraph mb={0} mt="0 !important">
                    {timeAgo(review.createdAt)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Typography paragraph mb={1}>
          {review.comment}
        </Typography>
        <Stack direction="row" justifyContent="start">
          <Button
            size="large"
            variant="text"
            color="secondary"
            onClick={() => {
              setShowReplyForm(!showReplyForm);
              handleToggleReply && handleToggleReply(`${review.id}`);
            }}
            className={buttonStyle.iconTextButton}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <ReplyOutlinedIcon /> Reply
            </Stack>
          </Button>
          {review.replyCount > 0 && !reply && (
            <Button
              size="large"
              variant="text"
              color="secondary"
              className={buttonStyle.iconTextButton}
              onClick={() =>
                handleToggleReply && handleToggleReply(`${review.id}`)
              }
            >
              {openReply === `${review.id}` ? "Hide" : "View"}{" "}
              {review.replyCount} replies
            </Button>
          )}
        </Stack>
        <Collapse in={showReplyForm} timeout="auto" unmountOnExit>
          <ReviewForm id={review.id} query={reply ? "replies" : "reviews"} />
        </Collapse>
      </Box>
    </ListItem>
  );
};

export default ReviewItem;
