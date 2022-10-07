import React, { Fragment, useState } from "react";
// mui components
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// app components
import ReviewForm from "@src/components/shared/review/ReviewForm";
import ReviewItem from "@src/components/shared/review/ReviewItem";
// interface, styles and utils
import { useQuery } from "react-query";
import { request, queryClient } from "@src/utils";
import { BasePageProps, ReviewInt } from "@src/utils/interface";

interface ReviewListInterface {
  reviewId: string;
}

const ReplyList = ({ reviewId }: ReviewListInterface) => {
  const [openReply, setOpenReply] = useState<string>("");
  //
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { token } = cachedData;
  //
  const { isLoading, isError, data } = useQuery(
    "replies",
    async () =>
      await await request.get({
        url: `/reviews/${reviewId}`,
        token,
      })
  );
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
      {/* <ReviewForm /> */}
      <List dense>
        {data?.data?.reviews.map((review: ReviewInt) => (
          <Fragment key={`${review.id}-review-list`}>
            <ReviewItem
              reply={true}
              review={review}
              openReply={openReply}
              handleToggleReply={handleToggleReply}
            />
            <Collapse
              in={openReply === `${review.id}`}
              timeout="auto"
              unmountOnExit
            >
              <Fragment></Fragment>
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default ReplyList;
