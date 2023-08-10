import React from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import { Link as MuiLink } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// interface

const LeagueBreadcrumbs = ({ pageData }: Record<string, any>) => {
  const { query } = useRouter();
  const { folderId } = query;
  const folder = pageData.leagueList.folder as Record<string, any>;

  return (
    <Stack top={0} position="sticky" spacing={2} mb={2}>
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
        {folderId === undefined ? (
          <Typography color="text.primary">Leagues</Typography>
        ) : (
          [
            <NextLink key="2" href="/leagues" passHref>
              <MuiLink underline="hover" color="inherit">
                Leagues
              </MuiLink>
            </NextLink>,
            <Typography key="3" color="text.primary">
              {folder?.name}
            </Typography>,
          ]
        )}
      </Breadcrumbs>
    </Stack>
  );
};

export default LeagueBreadcrumbs;
