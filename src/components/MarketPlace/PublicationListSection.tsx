import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as MuiLink } from "@mui/material";
//
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
//
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
// interface
import { MarketPlaceFunc } from "./interfaceType";

const PublicationListSection: MarketPlaceFunc = () => {
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
          <Typography
            mb={4}
            variant="h4"
            component="h2"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Top{" "}
            <Typography
              variant="h4"
              component="span"
              color="primary.main"
              fontWeight={"inherit"}
            >
              Featured Publications
            </Typography>{" "}
            From Experts
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={`${index}-course-card`}
                item
                xs={12}
                sm={6}
                md={4}
                xl={3}
              >
                <Card className={cardStyle.courseCard}>
                  <CardActionArea className="MuiCourseCardActionBase-root">
                    <Image
                      src={`/images/courses-${index}.png`}
                      width="100%"
                      height="60%"
                      layout="responsive"
                      objectFit="cover"
                      alt="Contentionary"
                    />
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: "nowrap",
                          alignItems: "start",
                          justifyContent: "between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h5">
                          Learn Marketing from Top Instructors.
                        </Typography>
                        <Typography
                          paragraph
                          mb={0}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <StarBorderOutlinedIcon
                            color="primary"
                            fontSize="inherit"
                          />{" "}
                          4.5
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Premium Centre gives you a vast categories by top
                        industry expert...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <NextLink href="/" passHref>
                      <Button
                        size="large"
                        disableElevation
                        variant="contained"
                        component={MuiLink}
                        className={globalStyle.bgGradient}
                        fullWidth
                      >
                        View publication
                      </Button>
                    </NextLink>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};

export default PublicationListSection;
