import React, { useState } from "react";
// next component
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/Input";
import Collapse from "@mui/material/Collapse";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
// app components
import UserAvatar from "@src/components/shared/avatar/UserAvatar";
// interface, utils and styles
import { useMutation } from "react-query";
import { queryClient, request } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { ReviewFormInt } from "./interfaceType";

const labels: { [index: string]: string } = {
  1: "Awful, not what I expected at all",
  2: "Poor, pretty disappointed",
  3: "Average, could be better",
  4: "Good, what I expected",
  5: "Excellent, above expectations!",
};

const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const ReviewForm = ({
  id,
  query = "reviews",
  subscribed = false,
}: ReviewFormInt) => {
  const theme = useTheme();
  const router = useRouter();
  const { id: queryId } = router.query;
  const [loading, setLoading] = useState(false);
  // comment
  const [comment, setComment] = useState("");
  const [reviewFormFocused, setReviewFormFocused] = useState<boolean>(false);
  // rating
  const [hover, setHover] = useState(-1);
  const [rating, setRating] = useState<number | null>(0);
  //
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { user } = cachedData;
  // Mutations
  const mutation = useMutation(
    async () => {
      return await request.post({
        url: `/review/${id}`,
        data: { comment, rating },
      });
    },
    {
      onSuccess: () => {
        setRating(0);
        setComment("");
        setLoading(false);
        // Invalidate and refetch
        queryClient.invalidateQueries(["reviews", { id: queryId }]);
        if (query === "replies")
          queryClient.invalidateQueries(["replies", { id }]);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );
  //
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate();
  };
  //
  if (!user || !subscribed) return <></>;
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
      <UserAvatar
        src={user?.avatar}
        sx={{ mt: 0.5, flexShrink: 0, display: { xs: "none", sm: "flex" } }}
        user={{ firstname: user?.firstname, lastname: user?.surname }}
      />
      <form style={{ flexGrow: 1 }} onSubmit={(e) => submit(e)}>
        <FormControl fullWidth variant="standard" sx={{ mb: 1 }}>
          <TextField
            multiline
            maxRows={4}
            name="comment"
            value={comment}
            placeholder="What&lsquo;s on your mind?"
            onFocus={() => setReviewFormFocused(true)}
            onChange={(e) => setComment(e.currentTarget.value)}
            sx={{
              "&:hover, &:before": {
                borderColor: theme.palette.divider + "!important",
              },
            }}
          />
        </FormControl>

        <Collapse in={reviewFormFocused}>
          <Stack
            direction={{ sx: "column", sm: "row" }}
            alignItems={{ sx: "start", sm: "center" }}
            justifyContent={{ sx: "start", sm: "space-between" }}
          >
            {query === "reviews" && (
              <Stack
                direction="row"
                alignItems="center"
                flexGrow={1}
                spacing={1}
              >
                <Typography
                  variant="body1"
                  display={{ xs: "none", sm: "inline-block" }}
                >
                  Rating:
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {/* <input name="rating" value={Number(rating)} hidden readOnly /> */}
                  <Rating
                    size="large"
                    value={rating}
                    precision={1}
                    getLabelText={getLabelText}
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "primary.light",
                      },
                    }}
                    onChange={(_event, newRating) => {
                      setRating(newRating);
                    }}
                    onChangeActive={(_event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : rating]}
                    </Box>
                  )}
                </Box>
              </Stack>
            )}
            <Stack direction="row" spacing={1} ml="auto">
              <Button
                variant="text"
                color="secondary"
                disableElevation
                onClick={() => setReviewFormFocused(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                color="primary"
                disableElevation
                variant="contained"
                loading={loading}
                disabled={comment === "" || loading}
              >
                Comment
              </LoadingButton>
            </Stack>
          </Stack>
        </Collapse>
      </form>
    </Stack>
  );
};

export default ReviewForm;
