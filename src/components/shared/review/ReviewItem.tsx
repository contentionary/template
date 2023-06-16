import React, { useState } from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// icons
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
// app components
import ReviewForm from "./ReviewForm";
import SnackbarComponent from "../snackerBar/SnackbarComponent";
import UserAvatar from "@src/components/shared/avatar/UserAvatar";
import DropdownMenu from "@src/components/shared/dropdown/DropdownMenu";
// style, util and interface
import { useMutation } from "react-query";
import { AlertColor } from "@mui/material";
import useButtonStyle from "@src/styles/button";
import { BasePageProps } from "@src/utils/interface";
import { queryClient, timeAgo, request } from "@src/utils";
import { ReviewFormInt, ReviewItemInt } from "./interfaceType";

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
    id: reply ? review.contentId : review.id,
    query: "replies",
  });
  //
  const buttonStyle = useButtonStyle();
  // alert
  const [alertData, setAlertData] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  // delete modal
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "Delete your comment permanently",
  });
  // form loading
  const [loading, setLoading] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  //Delete Mutations
  const mutation = useMutation(
    async () => {
      return await request.delete(`/review/${review.id}`);
    },
    {
      onSuccess: () => {
        setLoading(false);
        setAlertData((prevState) => ({
          ...prevState,
          open: true,
          message: "Review deleted",
        }));
        // Invalidate and refetch
        queryClient.invalidateQueries(["reviews"]);
        if (reply)
          queryClient.invalidateQueries(["replies", { id: review.contentId }]);
      },
      onError: () => {
        setLoading(false);
        setAlertData((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          message: "Something went wrong, try again!",
        }));
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

  // toggle reply form
  const handleReplyForm = () => {
    if (reply) {
      setReviewFormProps((prevState) => ({
        ...prevState,
        review,
        id: review.contentId,
        cancelReplyForm,
        query: "replies",
      }));
    }
    setShowReplyForm(!showReplyForm);
  };

  // handle review edit
  const handleEdit = () => {
    setReviewFormProps((prevState) => ({
      ...prevState,
      review,
      id: review.id,
      action: "edit",
      cancelReplyForm,
      query: reply ? "replies" : "reviews",
    }));
    setShowReplyForm(true);
  };

  // close alert
  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertData((prevState) => ({ ...prevState, open: false }));
  };

  // close delete
  const handleCloseDelete = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteModal((prevState) => ({ ...prevState, open: false }));
  };

  // handle open delete snackbar
  const handleOpenDelete = () => {
    setLoading(true);
    mutation.mutate();
    // setDeleteModal((prevState) => ({ ...prevState, open: true }));
  };

  // handle delete review
  const handleDelete = () => {
    handleCloseDelete();
    setLoading(true);
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
                {!reply && review.rating > 0 && (
                  <Rating
                    readOnly
                    precision={1}
                    name="text-feedback"
                    value={review.rating}
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
                  <MenuItem disabled={loading} onClick={handleEdit}>
                    <ListItemIcon>
                      <DriveFileRenameOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem disabled={loading} onClick={handleOpenDelete}>
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
              onClick={handleReplyForm}
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
      <SnackbarComponent
        open={alertData.open}
        message={alertData.message}
        keyStr="review-action-alert"
        severity={alertData.severity}
        handleClose={handleCloseAlert}
      />
      <SnackbarComponent
        action={
          <React.Fragment>
            <Button color="error" size="small" onClick={handleDelete}>
              DELETE
            </Button>
            <IconButton
              color="inherit"
              sx={{ p: 0.5 }}
              aria-label="close"
              onClick={handleCloseDelete}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
        open={deleteModal.open}
        message={deleteModal.message}
        keyStr="review-delete-alert"
        handleClose={handleCloseDelete}
      />
    </ListItem>
  );
};

export default ReviewItem;
