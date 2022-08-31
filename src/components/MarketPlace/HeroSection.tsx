import React, { Fragment } from "react";
// next
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
//
// import { useTheme } from "@mui/material/styles";
//
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
// app components
// icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// interface
import { MarketPlaceFunc } from "./interfaceType";

const HeroSection: MarketPlaceFunc = () => {
  // const theme = useTheme();
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              order={{ xs: 2, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "end", md: "center" },
              }}
            >
              <Image
                width={40}
                height={40}
                src="/images/bg-artifacts/burst-bloat.png"
                objectFit="cover"
                alt="Contentionary"
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography
                variant="h1"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
                component="h1"
              >
                The Foremost{" "}
                <Typography
                  variant="h1"
                  component="span"
                  fontWeight={"inherit"}
                  className={globalStyle.textGradient}
                >
                  Preparatory
                </Typography>{" "}
                Marketplace
              </Typography>
              <Typography
                sx={{
                  maxWidth: "450px",
                  mb: 3,
                  textAlign: { xs: "center", sm: "left" },
                }}
                paragraph
              >
                Join a Centre and access prep contents and prep tests by
                verified instructors and examiners.
              </Typography>
              <Stack
                sx={{ mb: 2 }}
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                className=""
              >
                <OutlinedInput
                  size="small"
                  placeholder="search for preparatory content..."
                  sx={{
                    minWidth: { xs: "100%", sm: "320px" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                />
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  className={globalStyle.bgGradient}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "block", sm: "inline-block" },
                  }}
                >
                  Search marketplace
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 3, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                className={cardStyle.breathCard}
              >
                <Paper
                  sx={{ maxWidth: 240, borderRadius: "20px !important" }}
                  className="left"
                >
                  <Typography variant="h5" component="h5">
                    Learn from best{" "}
                    <Typography
                      variant="h5"
                      component="span"
                      color="primary.main"
                      fontWeight={"inherit"}
                    >
                      instructors
                    </Typography>{" "}
                    around the globe Explore Top
                  </Typography>
                  <Box maxWidth={200} mx="auto" mt={2}>
                    <AvatarGroup max={5} total={100}>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <Avatar
                          key={`${index}-avatar`}
                          sx={{
                            mx: "auto",
                            bgcolor: "#FBEEE6",
                          }}
                        >
                          <PersonOutlineOutlinedIcon color="primary" />
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Paper>
                <Paper
                  sx={{ maxWidth: 160, top: "70% !important" }}
                  className="right"
                >
                  <Avatar
                    sx={{
                      mx: "auto",
                      bgcolor: "#FBEEE6",
                    }}
                  >
                    <PersonOutlineOutlinedIcon color="primary" />
                  </Avatar>
                  <Typography variant="h4" component="h5" color="primary">
                    15K
                  </Typography>
                  <Typography variant="h6" component="h5">
                    Amazing students around the globe
                  </Typography>
                </Paper>
                <Box
                  className="breath-img-container"
                  sx={{
                    width: "70% !important",
                    "&::before": {
                      backgroundImage: "url(/images/publication-img.jpg)",
                    },
                  }}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default HeroSection;
