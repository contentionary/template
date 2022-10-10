import React, { Fragment } from "react";
// mui components
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// app components
import ReviewItem from "@src/components/shared/review/ReviewItem";
// interface, styles and utils
import { useQuery } from "react-query";
import { request, queryClient } from "@src/utils";
import { ReviewInt } from "@src/utils/interface";

interface ReviewListInterface {
  reviewId: string;
}

const ReplyList = ({ reviewId }: ReviewListInterface) => {
  queryClient.invalidateQueries(["replies", { reviewId }]);
  const { isLoading, isError, data } = useQuery(
    ["replies", { id: reviewId }],
    async () =>
      await await request.get({
        url: `/reviews/${reviewId}`,
      })
  );
  //
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
            <ReviewItem reply={true} review={review} />
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default ReplyList;
