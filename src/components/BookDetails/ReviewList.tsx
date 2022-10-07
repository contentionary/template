import React, { Fragment, useState } from "react";
// mui components
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// app components
import ReplyList from "./ReplyList";
import ReviewForm from "@src/components/shared/review/ReviewForm";
import ReviewItem from "@src/components/shared/review/ReviewItem";
// interface, styles and utils
import { useQuery } from "react-query";
import { request, queryClient } from "@src/utils";
import { ReviewInt, BasePageProps } from "@src/utils/interface";

interface ReviewListInterface {
  publicationId: string;
}

const ReviewList = ({ publicationId }: ReviewListInterface) => {
  const [openReply, setOpenReply] = useState<string>("");
  //
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { token } = cachedData;
  //
  const { isLoading, isError, data } = useQuery("reviews", async () => {
    return await request.get({
      url: `/reviews/${publicationId}`,
      token,
    });
  });
  //
  const handleToggleReply = (discussion: string) => {
    if (openReply === discussion) setOpenReply("");
    else setOpenReply(discussion);
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
      <ReviewForm id={publicationId} query={"reviews"} />
      <List dense>
        {data?.data?.reviews.map((review: ReviewInt) => (
          <Fragment key={`${review.id}-review-list`}>
            <ReviewItem
              reply={false}
              review={review}
              openReply={openReply}
              handleToggleReply={handleToggleReply}
            />
            <Collapse
              in={openReply === `${review.id}`}
              timeout="auto"
              unmountOnExit
            >
              {openReply === review.id && review.replyCount && (
                <Fragment>
                  <ReplyList reviewId={review.id} />
                </Fragment>
              )}
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default ReviewList;
