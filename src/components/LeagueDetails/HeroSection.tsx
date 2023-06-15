import React, { Fragment } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// app components
import ImageComponent from "@src/components/shared/image";
// icons
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
//
import {
  formatDuration,
  intervalToDuration,
  differenceInSeconds,
} from "date-fns";
// hooks, styles, interface and config
import { bg } from "@src/styles";
import { useDialog } from "@src/hooks";
import useCardStyle from "@src/styles/card";
import { kCount, isServerSide } from "@src/utils";
import { LeagueDetailsPageFunc } from "./interfaceType";
import ConfirmPayment from "@src/components/payment/confirmPayment";
import ShareContentOnMedia from "@src/components/shared/shareContentOnMedia/share";

const HeroSection: LeagueDetailsPageFunc = ({ league, read }) => {
  const router = useRouter();
  const cardStyle = useCardStyle();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { reference, verifyValue, price: deductedPrice } = router.query;
  const {
    id,
    name,
    price,
    image,
    endDate,
    summary,
    startDate,
    subscriberCount,
  } = league;

  const redirectUrl = !isServerSide ? window.location.href : "";

  const countDownTime = () => {
    const startDatetime = new Date(startDate);
    const endDatetime = new Date(endDate);
    /* startDate endDate */
    const now = new Date();
    let countdownText = "";

    // Check if the current time is before the start datetime
    if (now < startDatetime) {
      const duration = intervalToDuration({
        start: now,
        end: startDatetime,
      });
      countdownText = `Starts in: ${formatDuration(duration, {
        format: ["months", "days", "hours", "minutes", "seconds"],
        delimiter: ", ",
      })}`;
    }
    // Check if the current time is after the start datetime and before the end datetime
    else if (now < endDatetime) {
      const duration = intervalToDuration({
        start: now,
        end: endDatetime,
      });
      countdownText = `Ends in: ${formatDuration(duration, {
        format: ["months", "days", "hours", "minutes", "seconds"],
        delimiter: ", ",
      })}`;
    }
    // Otherwise, the event is closed
    else {
      countdownText = "Closed";
    }
    return countdownText;
  };

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, pb: 8, px: { md: 6 }, ...bg().bgDustyPrimary }}
      >
        {verifyValue && (
          <ConfirmPayment
            price={Number(deductedPrice)}
            reference={reference}
            redirectUrl={redirectUrl}
          />
        )}
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box width="80%">
                <ImageComponent
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  alt="Edtify"
                  src={image}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Typography variant="h3" component="h1">
                {name}
              </Typography>
              <Typography paragraph>{summary}</Typography>
              <Typography paragraph>
                <Typography
                  variant="subtitle1"
                  component="span"
                  color="primary"
                >
                  League ID:
                </Typography>{" "}
                {id}
              </Typography>
              <Stack
                my={2}
                spacing={2}
                flexWrap="wrap"
                direction="row"
                alignItems="center"
              >
                <Typography variant="h6" display="flex" alignItems="center">
                  <GroupAddOutlinedIcon color="primary" fontSize="small" />
                  &nbsp; {kCount(subscriberCount)} League Takers
                </Typography>
                <Typography variant="h6" display="flex" alignItems="center">
                  <CalendarMonthOutlinedIcon color="primary" fontSize="small" />
                  &nbsp; {countDownTime()}
                </Typography>
              </Stack>
              <Typography variant="h4" component="h2">
                {price <= 0 ? "Free" : ` ₦${price}`}
              </Typography>
              <Stack
                mt={1}
                spacing={2}
                rowGap={1}
                flexWrap="wrap"
                direction="row"
                alignItems="center"
              >
                {read.text !== "OPEN LEAGUE" && (
                  <NextLink href={read.link} passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      display={{ xs: "block", sm: "inline-block" }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <AutoStoriesOutlinedIcon /> &nbsp; {read.text}
                      </Stack>
                    </Button>
                  </NextLink>
                )}
                <Button
                  size="large"
                  color="primary"
                  disableElevation
                  variant="outlined"
                  onClick={() => openDialog()}
                >
                  <ShareOutlinedIcon />
                  Share
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ShareContentOnMedia isOpen={isOpen} closeDialog={closeDialog} />
    </Fragment>
  );
};
export default HeroSection;
