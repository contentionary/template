import React, { Fragment } from "react";

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
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// hooks, styles, interface and config
import { useDialog } from "@src/hooks";
import useGlobalStyle from "@src/styles";
import { isServerSide } from "@src/utils";
import useButtonStyle from "@src/styles/button";
import { ExamDetailsPageFunc } from "./interfaceType";
import ConfirmPayment from "@src/components/payment/confirmPayment";
import ShareContentOnMedia from "@src/components/shared/shareContentOnMedia/share";

const HeroSection: ExamDetailsPageFunc = ({ exam, read }) => {
  const router = useRouter();
  const buttonStyle = useButtonStyle();
  const globalStyle = useGlobalStyle();

  const { isOpen, openDialog, closeDialog } = useDialog();
  const { reference, verifyValue, price: deductedPrice } = router.query;

  const { name, price, image } = exam;

  const redirectUrl = !isServerSide ? window.location.href : "";

  return (
    <Fragment>
      <Box
        component="section"
        className={globalStyle.bgDustyPrimary}
        sx={{ pt: 4, pb: 8, px: { md: 6 } }}
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
                  alt="Contentionary"
                  src={image}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Typography variant="h2" component="h1">
                {name}
              </Typography>
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
                {Boolean(read.show) && (
                  <Button
                    size="large"
                    onClick={() => {
                      if (!isServerSide) window.location.href = read.link;
                    }}
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    className={globalStyle.bgGradient}
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <AutoStoriesOutlinedIcon /> &nbsp; {read.text}
                    </Stack>
                  </Button>
                )}
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
