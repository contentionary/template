import React from "react";
//
import NextLink from "next/link";
//
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
//
import { UserInt, CachedCentreInt } from "@src/utils/interface";

interface ProfileMenuInt {
  cachedData: { user: UserInt; token: string; centre: CachedCentreInt };
}

const PublicationsMenu = ({ cachedData }: ProfileMenuInt) => {
  const { user } = cachedData;

  return (
    <List>
      <NextLink href="/" passHref>
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
      {user ? (
        <>
          <NextLink href="/library/my-books" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Books</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
          <NextLink href="/logout" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
        </>
      ) : (
        <>
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
        </>
      )}
    </List>
  );
};

export default PublicationsMenu;
