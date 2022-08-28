import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// interface
import { MarketPlaceFunc } from "./interfaceType";

const ProductsSection: MarketPlaceFunc = () => {
  return (
    <Fragment>
      <Box component="section" sx={{ pt: 4, pb: 8 }} className="hero-section">
        <Container maxWidth="xl">
          <Grid container spacing={2} wrap="nowrap">
            <Grid item md={3} xs={5}>
              <Box
                sx={{
                  width: "100%",
                  minHeight: "auto",
                  position: "relative",
                }}
              >
                <Image
                  width="80%"
                  height="60%"
                  src="/images/hero-img.png"
                  layout="responsive"
                  objectFit="cover"
                  alt="Contentionary"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default ProductsSection;
