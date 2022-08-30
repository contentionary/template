import React, { Fragment } from "react";
// next
// import Image from "next/image";
// import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
// import { Link as MuiLink } from "@mui/material";
//
import useGlobalStyle from "@src/styles";
import useButtonStyle from "@src/styles/button";
//
// interface
import { MarketPlaceFunc } from "./interfaceType";
// icons
import NoteIcon from "@src/assets/icons/note.svg";
import BookIcon from "@src/assets/icons/book.svg";
import BookmarkIcon from "@src/assets/icons/bookmark.svg";
import MedalStarIcon from "@src/assets/icons/medal-star.svg";

const ProductsSection: MarketPlaceFunc = () => {
  const globalStyle = useGlobalStyle();
  const buttonStyle = useButtonStyle();

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 4, xl: 0 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Typography
            mb={4}
            variant="h4"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            &middot; WHAT WE OFFER &middot;
          </Typography>
          <Grid
            container
            wrap="nowrap"
            className={globalStyle.hiddenScrollbar}
            sx={{ overflowX: "auto", scrollSnapType: "x mandatory" }}
            spacing={{ xs: 2, sm: 3, lg: 4 }}
          >
            <Grid
              item
              md={3}
              sm={4}
              xs={5}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ButtonBase focusRipple className={buttonStyle.imageButton}>
                <Box
                  component="span"
                  className="MuiImageBase-root"
                  sx={{ backgroundImage: "url(/images/exam-img.jpg)" }}
                />
                <Box component="span" className="MuiImageBackdrop-root" />
                <Box component="span" className="MuiImageFlex-root">
                  <Typography component="h5" variant="h5" color="inherit">
                    <BookIcon className="MuiSvgFlip-root" fill="white" /> Exams
                  </Typography>
                </Box>
              </ButtonBase>
            </Grid>
            <Grid
              item
              md={3}
              sm={4}
              xs={5}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ButtonBase focusRipple className={buttonStyle.imageButton}>
                <Box
                  component="span"
                  className="MuiImageBase-root"
                  sx={{ backgroundImage: "url(/images/league-img.jpg)" }}
                />
                <Box component="span" className="MuiImageBackdrop-root" />
                <Box component="span" className="MuiImageFlex-root">
                  <Typography component="h5" variant="h5" color="inherit">
                    <MedalStarIcon className="MuiSvgFlip-root" fill="white" />{" "}
                    Leagues
                  </Typography>
                </Box>
              </ButtonBase>
            </Grid>
            <Grid
              item
              md={3}
              sm={4}
              xs={5}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ButtonBase focusRipple className={buttonStyle.imageButton}>
                <Box
                  component="span"
                  className="MuiImageBase-root"
                  sx={{
                    backgroundImage: "url(/images/online-course-img.jpg)",
                  }}
                />
                <Box component="span" className="MuiImageBackdrop-root" />
                <Box component="span" className="MuiImageFlex-root">
                  <Typography component="h5" variant="h5" color="inherit">
                    <NoteIcon className="MuiSvgFlip-root" fill="white" /> Online
                    Courses
                  </Typography>
                </Box>
              </ButtonBase>
            </Grid>
            <Grid
              item
              md={3}
              sm={4}
              xs={5}
              sx={{
                flexGrow: 1,
                minWidth: "fit-content",
                scrollSnapAlign: "start",
              }}
            >
              <ButtonBase focusRipple className={buttonStyle.imageButton}>
                <Box
                  component="span"
                  className="MuiImageBase-root"
                  sx={{
                    backgroundImage: "url(/images/publication-img.jpg)",
                  }}
                />
                <Box component="span" className="MuiImageBackdrop-root" />
                <Box component="span" className="MuiImageFlex-root">
                  <Typography component="h5" variant="h5" color="inherit">
                    <BookmarkIcon className="MuiSvgFlip-root" fill="white" />
                    Publication
                  </Typography>
                </Box>
              </ButtonBase>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default ProductsSection;
