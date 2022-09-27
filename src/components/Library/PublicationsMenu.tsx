import React from "react";
// next
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
// app components
// styles and interface
import useListMenuStyle from "@src/styles/listMenu";
import { LibraryPageFunc } from "./interfaceType";

const PublicationsMenu: LibraryPageFunc = () => {
  const listMenuStyle = useListMenuStyle();

  return (
    <Box top={32} position="sticky">
      <Typography mb={2} variant="h5">
        Categories
      </Typography>
      <List disablePadding className={listMenuStyle.listMenuRoot}>
        <ListItem disablePadding>
          <NextLink href="/" passHref>
            <ListItemButton component={MuiLink}>
              <ListItemText primary="Marketing" />
            </ListItemButton>
          </NextLink>
        </ListItem>
        <ListItem disablePadding>
          <NextLink href="/" passHref>
            <ListItemButton component={MuiLink}>
              <ListItemText primary="Marketing" />
            </ListItemButton>
          </NextLink>
        </ListItem>
        <ListItem disablePadding>
          <NextLink href="/" passHref>
            <ListItemButton component={MuiLink}>
              <ListItemText primary="Marketing" />
            </ListItemButton>
          </NextLink>
        </ListItem>
      </List>
    </Box>
  );
};

export default PublicationsMenu;
