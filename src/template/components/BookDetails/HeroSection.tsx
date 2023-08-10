import React, { Fragment } from "react";

import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
// styles, interface and config
import { bg } from "@src/template/styles";
import { BookDetailsPageFunc } from "./interfaceType";
// app components
import ImageComponent from "@src/template/components/shared/image";
// icons
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
//
import { useDialog } from "@src/utils/hooks";
import { isServerSide } from "@src/utils";
import ShareContentOnMedia from "@src/template/components/shared/shareContentOnMedia/share";
import ConfirmPayment from "@src/template/components/payment/confirmPayment";

const HeroSection: BookDetailsPageFunc = ({ publication, read, centre }) => {
  const theme = useTheme();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const router = useRouter();
  const { reference, verifyValue, price: deductedPrice, tx_ref } = router.query;

  const {
    name,
    price,
    imageUrl,
    authors = [],
    publicationCategoryName,
    summary,
  } = publication;

  const redirectUrl = !isServerSide ? window.location.href : "";

  return (
    <Fragment>
      <Box
        component="section"
        className="hero-section"
        bgcolor={alpha(theme.palette.primary["main"], 0.02)}
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
                  src={imageUrl}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Typography color="primary" mb={1} paragraph>
                {publicationCategoryName}
              </Typography>
              <Typography variant="h2" component="h1">
                {name}
              </Typography>
              <Typography variant="h6" mt={1} color="GrayText" component="h1">
                {summary}
              </Typography>
              <Stack
                mt={3}
                mb={6}
                spacing={4}
                direction={{ xs: "column", md: "row" }}
              >
                <Typography variant="h6">
                  {authors?.length > 1 ? "Authors" : "Author"}:
                </Typography>
                <Stack direction="row" flexWrap="wrap" justifyContent="start">
                  {authors?.map(({ name, imageUrl }, index) => (
                    <Stack
                      mr={4}
                      mb={1}
                      spacing={1}
                      direction="row"
                      alignItems="center"
                      key={index + "author"}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {imageUrl ? (
                          <ImageComponent
                            alt="user"
                            layout="fill"
                            objectFit="contain"
                            src={imageUrl}
                          />
                        ) : (
                          name[0]
                        )}
                      </Avatar>
                      <Typography paragraph>{name}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Typography variant="h3" component="h1">
                {centre.subscriptionModel === "SUBSCRIPTION"
                  ? ""
                  : price <= 0
                  ? "Free"
                  : ` ₦${price}`}
              </Typography>
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
                    color="primary"
                    display={{ xs: "block", sm: "inline-block" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <AutoStoriesOutlinedIcon /> &nbsp; {read.text}
                    </Stack>
                  </Button>
                )}

                <Button onClick={() => openDialog()}>
                  <Avatar variant="rounded" sx={{ ...bg().underlinedCurve }}>
                    <ShareOutlinedIcon htmlColor="white" />
                  </Avatar>{" "}
                  <span>&nbsp; Share publication</span>
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
