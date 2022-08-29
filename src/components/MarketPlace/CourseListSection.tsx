import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
//
import useGlobalStyle from "@src/styles";
//
import { CardActionArea } from "@mui/material";
// interface
import { MarketPlaceFunc } from "./interfaceType";

const CourseListSection: MarketPlaceFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box component="section" sx={{ pt: 4, pb: 8 }} className="hero-section">
        <Container maxWidth="xl">
          <Typography
            mb={4}
            variant="h4"
            component="h2"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Explore{" "}
            <Typography
              variant="h4"
              component="span"
              color="primary.main"
              fontWeight={"inherit"}
              sx={{ whiteSpace: "nowrap" }}
            >
              Top Online
            </Typography>{" "}
            Courses From Highly Qualified Educators
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
            <Grid item lg={3} md={4} xs={6}>
              <Card className={globalStyle.paperShadowSm}>
                <CardActionArea>
                  <Image
                    src="/images/courses-1.png"
                    width="100%"
                    height="60%"
                    layout="responsive"
                    objectFit="cover"
                    alt="Contentionary"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Learn Marketing from Top Instructors.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Premium Centre gives you a vast categories by top industry
                      expert...
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};

export default CourseListSection;
