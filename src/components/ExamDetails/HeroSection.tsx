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
// hooks, styles, interface and config
import { useDialog } from "@src/hooks";
import { bg } from "@src/styles";
import useButtonStyle from "@src/styles/button";
import { ExamDetailsPageFunc } from "./interfaceType";
import { kCount, isServerSide, dateTimeFormat } from "@src/utils";
import ConfirmPayment from "@src/components/payment/confirmPayment";
import ShareContentOnMedia from "@src/components/shared/shareContentOnMedia/share";

const HeroSection: ExamDetailsPageFunc = ({ exam, read }) => {
  const router = useRouter();
  const buttonStyle = useButtonStyle();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { reference, verifyValue, price: deductedPrice, tx_ref } = router.query;
  const {
    id,
    name,
    price,
    image,
    summary,
    subscriberCount,
    questionCount,
    startDate,
    endDate,
  } = exam;

  const redirectUrl = !isServerSide ? window.location.href : "";

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, pb: 8, px: { md: 6 }, ...bg().bgDustyPrimary }}
      >
        {verifyValue && (
          <ConfirmPayment
            price={Number(deductedPrice)}
            reference={reference || tx_ref}
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
              <Typography variant="h2" component="h1">
                {name}
              </Typography>
              <Typography paragraph>{summary}</Typography>
              <Typography paragraph>
                <Typography
                  variant="subtitle1"
                  component="span"
                  color="primary"
                >
                  Exam ID:
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
                  &nbsp; {kCount(subscriberCount)} Exam Takers
                </Typography>
                <Typography variant="h6" display="flex" alignItems="center">
                  <HelpOutlineOutlinedIcon color="primary" fontSize="small" />
                  &nbsp; No of Questions: {kCount(questionCount)}
                </Typography>
                <Typography variant="h6" display="flex" alignItems="center">
                  <CalendarMonthOutlinedIcon color="primary" fontSize="small" />
                  &nbsp; Date:{" "}
                  {startDate && endDate
                    ? `${dateTimeFormat(startDate)} - ${dateTimeFormat(
                        endDate
                      )}`
                    : ""}
                </Typography>
              </Stack>
              <Typography variant="h3" component="h1">
                {price <= 0 ? "Free" : ` ₦${price}`}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  color="secondary"
                  onClick={() => openDialog()}
                  className={buttonStyle.iconTextButton}
                >
                  <ShareOutlinedIcon />
                  Share
                </Button>
              </Stack>
              <Stack
                mt={1}
                spacing={2}
                rowGap={1}
                flexWrap="wrap"
                direction="row"
                alignItems="center"
              >
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
