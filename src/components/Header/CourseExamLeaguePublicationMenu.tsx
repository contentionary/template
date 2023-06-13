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
  cachedData: {
    user: UserInt;
    token: string;
    centre: CachedCentreInt;
  };
}

export const AppMenuLink = ({ url, title }: { url: string; title: string }) => {
  return (
    <NextLink href={url} passHref>
      <ListItemButton>
        <ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItemIcon>
      </ListItemButton>
    </NextLink>
  );
};

const CourseExamLeaguePublicationMenu = ({ cachedData }: ProfileMenuInt) => {
  const { user, centre } = cachedData;
  return (
    <List>
      <AppMenuLink url="/" title="home" />
      {centre.plugins.COURSE && <AppMenuLink url="/courses" title="Courses" />}
      {centre.plugins.PUBLICATION && (
        <AppMenuLink url="/library" title="Books" />
      )}
      {centre.plugins.EXAM && <AppMenuLink url="/exams" title="Exams" />}
      {centre.plugins.LEAGUE && <AppMenuLink url="/leagues" title="Leagues" />}

      {user ? (
        <React.Fragment>
          {user.isAdmin && <AppMenuLink url="/admin" title="Admin" />}
          {centre.plugins.COURSE && (
            <AppMenuLink url="/courses/my-courses" title="My Course" />
          )}
          {centre.plugins.PUBLICATION && (
            <AppMenuLink url="/library/my-books" title="My Books" />
          )}
          {centre.plugins.EXAM && (
            <AppMenuLink url="/exams/my-results" title="My Result" />
          )}
          {centre.plugins.LEAGUE && (
            <AppMenuLink url="/leagues/my-leagues" title="My Leagues" />
          )}
          {centre.plugins.EXAM && (
            <AppMenuLink url="/exams/my-exams" title="My Exams" />
          )}{" "}
          <AppMenuLink url="/settings" title="Profile Settings" />
          <AppMenuLink url="/wallet" title="My Wallet" />
          <AppMenuLink url="/logout" title="Logout" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AppMenuLink url="/login" title="Login" />
          <AppMenuLink url="/register" title="Create Account" />
        </React.Fragment>
      )}
    </List>
  );
};

export default CourseExamLeaguePublicationMenu;
