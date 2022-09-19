import React from "react";
//
import NextLink from "next/link";
//
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
// interface and config
import config from "@src/utils/config";

const AppMenu = () => {
  return (
    <List>
      <NextLink
        href={`${config.URL.WEB}features/online-learning-video-and-audio`}
        passHref
      >
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Apps</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink
        href={`${config.URL.GROUP}resources/creating-a-centre`}
        passHref
      >
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Resources</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href={`${config.URL.WEB}pricing`} passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Pricing</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href={`${config.URL.WEB}market-place`} passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Marketplace</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href={`${config.URL.WEB}login`} passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href={`${config.URL.WEB}create-account`} passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Create Account</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
    </List>
  );
};

export default AppMenu;
