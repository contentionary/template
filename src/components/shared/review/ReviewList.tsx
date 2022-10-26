import React, { Fragment, useState } from "react";
// mui components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// icons
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
// app components
import ReplyList from "./ReplyList";
import ReviewForm from "@src/components/shared/review/ReviewForm";
import ReviewItem from "@src/components/shared/review/ReviewItem";
// interface, styles and utils
import { request } from "@src/utils";
import { useQuery } from "react-query";
import { ReviewInt } from "@src/utils/interface";

interface ReviewListInterface {
  contentId: string;
  isSubscriber: boolean;
  allowRating: boolean;
}

const ReviewList = ({
  isSubscriber,
  contentId,
  allowRating = true,
}: ReviewListInterface) => {
  const [openReply, setOpenReply] = useState<string>("");
  //
  const { isLoading, isError, data } = useQuery(
    ["reviews", { id: contentId }],
    async () => {
      return await request.get({
        url: `/reviews/${contentId}?orderBy=date&order=desc`,
      });
    }
  );
  //
  const handleToggleReply = (discussion: string) => {
    if (openReply === discussion) {
      setOpenReply("");
    } else {
      setOpenReply(discussion);
    }
  };

  if (isLoading) {
    return (
      <Fragment>
        <Typography variant="h4" textAlign="center">
          <CircularProgress color="secondary" />
        </Typography>
      </Fragment>
    );
  }
  if (isError) {
    return (
      <Fragment>
        <Typography variant="h4" textAlign="center">
          ❗ Something went wrong
        </Typography>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ReviewForm
        query={"reviews"}
        id={contentId}
        subscribed={isSubscriber}
        allowRating={allowRating}
      />
      {data?.data?.reviews?.length > 0 ? (
        <List dense>
          {data?.data?.reviews.map((review: ReviewInt) => (
            <Fragment key={`${review.id}-review-list`}>
              <ReviewItem
                reply={false}
                review={review}
                openReply={openReply}
                subscribed={isSubscriber}
                handleToggleReply={handleToggleReply}
              />
              <Collapse
                in={openReply === `${review.id}`}
                timeout="auto"
                unmountOnExit
              >
                {openReply === review.id && review.replyCount && (
                  <Fragment>
                    <ReplyList
                      isSubscriber={isSubscriber}
                      reviewId={review.id}
                    />
                  </Fragment>
                )}
              </Collapse>
            </Fragment>
          ))}
        </List>
      ) : (
        <Box flexDirection="column" display="flex" alignItems="center" pt={5}>
          <SpeakerNotesOutlinedIcon
            style={{ fontSize: 100, color: "secondary.light" }}
          />
          <Typography mt={2} textAlign="center">
            No reviews or discussions
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default ReviewList;
