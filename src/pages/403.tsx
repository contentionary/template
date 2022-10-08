import React from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// icon
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const Custom403 = () => {
  return (
    <Box component="section" className="error-section">
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign="center" maxWidth={480}>
          <Box textAlign="center" width={320}>
            <Image
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              alt="Something went wrong! Please try again later."
              src="/images/state/secure-files.svg"
            />
          </Box>
          <Typography variant="h4" mb={2}>
            Access Denied!
          </Typography>
          <Typography paragraph mb={4}>
            Please, login to continue...
          </Typography>
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
          &nbsp;
          <NextLink passHref href="/login">
            <Button
              size="large"
              color="error"
              disableElevation
              variant="contained"
              component={MuiLink}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <LoginOutlinedIcon /> &nbsp; Login
              </Stack>
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};
export default Custom403;
