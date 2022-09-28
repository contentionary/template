import React from "react";
//
import NextLink from "next/link";
//
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

const PublicationsMenu = () => {
  return (
    <List>
      <NextLink href="/publication" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/library" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Library</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/about-us" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>About Us</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/login" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/register" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Create Account</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
    </List>
  );
};

export default PublicationsMenu;
