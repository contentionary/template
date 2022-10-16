import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// icons
import ReviewClosedIcon from "@mui/icons-material/WarningAmberOutlined";
// app components
import ReviewList from "./ReviewList";

interface Props {
  contentId: string;
  isSubscriber: boolean;
  allowReview: boolean;
  allowRating?: boolean;
}

const BookReview = ({
  contentId,
  isSubscriber,
  allowReview,
  allowRating = true,
}: Props) => {
  //
  return (
    <Fragment>
      {allowReview ? (
        <ReviewList
          allowRating={allowRating}
          isSubscriber={isSubscriber}
          publicationId={contentId}
        />
      ) : (
        <Box flexDirection="column" display="flex" alignItems="center">
          <ReviewClosedIcon style={{ fontSize: 100 }} />
          <Typography textAlign="center">Review not activated!</Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default BookReview;
