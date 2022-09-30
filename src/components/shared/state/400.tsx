import React from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// interface
import { ErrorPageFunc } from "./interfaceType";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// icon
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const Page400: ErrorPageFunc = ({ error, showButton = true }) => {
  return (
    <Box
      component="section"
      className="hero-section"
      sx={{ pt: 4, pb: 8, px: { md: 6 } }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box textAlign="center" maxWidth={380}>
          <Image
            src={
              error.statusCode === 403
                ? "/images/state/secure-files.svg"
                : "/images/state/404.svg"
            }
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            alt={error.message}
          />
          <Typography variant="h4" mb={4}>
            {error.message}
          </Typography>
          {showButton && (
            <NextLink passHref href="/">
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <KeyboardBackspaceOutlinedIcon /> &nbsp; Go back home
                </Stack>
              </Button>
            </NextLink>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Page400;
