import React from "react";
// next
import NextLink from "next/link";
// mui components
import { Link as MuiLink } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MyPublicationsBreadcrumbs = () => {
  return (
    <Stack spacing={2} mb={2}>
      <Breadcrumbs
        maxItems={4}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NextLink href="/" passHref>
          <MuiLink underline="hover" color="inherit">
            Home
          </MuiLink>
        </NextLink>
        <NextLink key="2" href="/library" passHref>
          <MuiLink underline="hover" color="inherit">
            Library
          </MuiLink>
        </NextLink>
        ,<Typography color="text.primary">My Publications</Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export default MyPublicationsBreadcrumbs;
