import React from "react";
// next components
import Image from "@src/components/shared/image";
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

const Page500: ErrorPageFunc = ({ error }) => {
  return (
    <Box
      component="section"
      className="error-section"
      sx={{ pt: 4, pb: 8, px: { md: 6 } }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box textAlign="center" maxWidth={380}>
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            alt={error.message}
            src="/images/state/server-down.svg"
          />
          <Typography variant="h4" mb={4}>
            {error.message}
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

export default Page500;
