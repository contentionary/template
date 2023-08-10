import React from "react";
// next components
import Image from "@src/template/components/shared/image";
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
// interface
import { EmptyPageInt } from "./interfaceType";

const Empty = ({ error, href, buttonText, title, message }: EmptyPageInt) => {
  return (
    <Box
      component="section"
      className="error-section"
      sx={{ pt: 4, pb: 8, px: { md: 6 } }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign="center" maxWidth={380}>
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            alt={error?.message || "No content"}
            src="/images/state/empty-cart.svg"
          />
          <Typography variant="h4">
            {title ? title : "Content not available"}
          </Typography>
          <Typography paragraph mb={4}>
            {message
              ? message
              : error?.message
              ? error?.message
              : "Browse our content and discover our best offer!"}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <NextLink passHref href="/">
              <Button
                size="large"
                disableElevation
                variant={href ? "outlined" : "contained"}
                color={href ? "secondary" : "primary"}
                component={MuiLink}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <KeyboardBackspaceOutlinedIcon /> &nbsp; Go back home
                </Stack>
              </Button>
            </NextLink>
            {href && (
              <NextLink passHref href={href}>
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                >
                  {buttonText}
                </Button>
              </NextLink>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Empty;
