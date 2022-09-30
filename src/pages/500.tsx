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
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const Custom500 = () => {
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
        <Box textAlign="center" maxWidth={380}>
          <Box textAlign="center" width={320}>
            <Image
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              alt="Something went wrong! Please try again later."
              src="/images/state/server-down.svg"
            />
          </Box>
          <Typography variant="h4" mb={2}>
            System Error
          </Typography>
          <Typography paragraph mb={4}>
            Something went wrong! Please try again later.
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
        </Box>
      </Container>
    </Box>
  );
};
export default Custom500;
