import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// icons
import ReviewClosedIcon from "@mui/icons-material/WarningAmberOutlined";
// app components
import ReviewList from "./ReviewList";
// interface, styles and utils
import { BookDetailsPageFunc } from "./interfaceType";

const BookReview: BookDetailsPageFunc = (props) => {
  //
  return (
    <Fragment>
      {props.publication.allowReview ? (
        <ReviewList auth={props.auth} publicationId={props.publication.id} />
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
