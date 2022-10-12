import React, { useState } from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
// icons
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
// app components
import ReviewForm from "./ReviewForm";
import UserAvatar from "@src/components/shared/avatar/UserAvatar";
import DropdownMenu from "@src/components/shared/dropdown/DropdownMenu";
// style, util and interface
import { useMutation } from "react-query";
import useButtonStyle from "@src/styles/button";
import { ReviewFormInt, ReviewItemInt } from "./interfaceType";
import { queryClient, timeAgo, request } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const ReviewItem = (props: ReviewItemInt) => {
  const {
    reply,
    review,
    openReply,
    handleToggleReply,
    subscribed = false,
  } = props;
  const [reviewFormProps, setReviewFormProps] = useState<ReviewFormInt>({
    subscribed,
    id: review.id,
    query: "replies",
  });
  //
  const buttonStyle = useButtonStyle();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  // Mutations
  const mutation = useMutation(
    async () => {
      return await request.delete(`/review/${review.id}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["reviews"]);
        if (reply)
          queryClient.invalidateQueries(["replies", { id: review.id }]);
      },
      onError: () => {
        // setLoading(false);
      },
    }
  );

  const cancelReplyForm = () => {
    setReviewFormProps((prevState) => ({
      ...prevState,
      action: "create",
      query: "replies",
    }));
    setShowReplyForm(false);
  };

  const handleEdit = () => {
    setReviewFormProps((prevState) => ({
      ...prevState,
      review,
      action: "edit",
      cancelReplyForm,
      query: reply ? "replies" : "reviews",
    }));
    setShowReplyForm(true);
    // alert(review.id + " edit");
  };

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <ListItem alignItems="flex-start" sx={{ pr: 0, pl: reply ? 4 : 0 }}>
      <ListItemAvatar sx={{ display: { xs: "none", md: "flex" } }}>
        <UserAvatar
          src={review.avatar}
          sx={{ mr: 2, ...{ width: reply ? 32 : 40, height: reply ? 32 : 40 } }}
          user={{ firstname: review.firstname, lastname: review.surname }}
        />
      </ListItemAvatar>
      <Box flexGrow={1}>
        <Stack direction="row" spacing={2}>
          <UserAvatar
            src={review.avatar}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              ...{ width: reply ? 32 : 40, height: reply ? 32 : 40 },
            }}
            user={{ firstname: review.firstname, lastname: review.surname }}
          />
          <Stack direction="row" spacing={1} ml="0 !important" flexGrow={1}>
            <Box flexGrow={1}>
              <Typography variant="h6" mb={0}>
                {review.firstname} {review.surname}
              </Typography>
              <Stack direction="row" spacing={1}>
                {!reply && (
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
                )}
                <Typography variant="body2" mb={0} mt="0 !important">
                  {timeAgo(review.createdAt)}
                </Typography>
              </Stack>
            </Box>
            <Box>
              {cachedData.user && review.userId === cachedData.user.id && (
                <DropdownMenu title={<MoreVertIcon />}>
                  <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                      <DriveFileRenameOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                      <DeleteOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </DropdownMenu>
              )}
            </Box>
          </Stack>
        </Stack>
        <Typography paragraph mb={1}>
          {review.comment}
        </Typography>
        <Stack direction="row" justifyContent="start">
          {subscribed && (
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setShowReplyForm(!showReplyForm);
              }}
              className={buttonStyle.iconTextButton}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <ReplyOutlinedIcon /> Reply
              </Stack>
            </Button>
          )}
          {review.replyCount > 0 && !reply && (
            <Button
              variant="text"
              color="secondary"
              className={buttonStyle.iconTextButton}
              onClick={() =>
                handleToggleReply && handleToggleReply(`${review.id}`)
              }
            >
              {openReply === `${review.id}` ? "Hide" : "View"}{" "}
              {review.replyCount} {review.replyCount > 1 ? "replies" : "reply"}
            </Button>
          )}
        </Stack>
        <Collapse in={showReplyForm} timeout="auto" unmountOnExit>
          <ReviewForm {...reviewFormProps} />
        </Collapse>
      </Box>
    </ListItem>
  );
};

export default ReviewItem;
