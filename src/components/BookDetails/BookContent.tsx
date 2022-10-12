import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// mui components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
// icons
import WarningIcon from "@mui/icons-material/WarningAmberOutlined";

// interface, styles and config
import { BookDetailsPageFunc } from "./interfaceType";
import { Box, Link, ListItemButton, ListItemIcon } from "@mui/material";

const BookContent: BookDetailsPageFunc = ({ publication, read }) => {
  const { tableOfContents = [] } = publication;
  return (
    <Fragment>
      {tableOfContents?.length ? (
        <List>
          <Grid container spacing={2}>
            <Grid item md={6}>
              {tableOfContents?.map(({ title, pageNo }, index) => (
                <NextLink
                  key={`${pageNo}-overview-list`}
                  href={`${read.link}?pageNo=${pageNo}`}
                  passHref
                >
                  <ListItemButton LinkComponent={Link}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 30, height: 30, fontSize: 15 }}>
                        {index + 1}
                      </Avatar>{" "}
                    </ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItemButton>
                </NextLink>
              ))}
            </Grid>
          </Grid>
        </List>
      ) : (
        <Box flexDirection="column" display="flex" alignItems="center">
          <WarningIcon style={{ fontSize: 100 }} />
          <Typography textAlign="center">No Table of Contents</Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default BookContent;
