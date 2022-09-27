import React from "react";
// next
import NextLink from "next/link";
// mui components
import { Link as MuiLink } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// interface
import { LibraryPageFunc } from "./interfaceType";

const PublicationBreadcrumbs: LibraryPageFunc = () => {
  return (
    <Stack top={0} position="sticky" spacing={2} mb={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NextLink href="/" passHref>
          <MuiLink underline="hover" color="inherit">
            Home
          </MuiLink>
        </NextLink>
        <Typography color="text.primary">Library</Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export default PublicationBreadcrumbs;
