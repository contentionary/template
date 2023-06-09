import React from "react";
//
import NextLink from "next/link";
//
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
//
import { UserInt } from "@src/utils/interface";

interface ProfileMenuInt {
  cachedData: { user: UserInt; token: string };
}

const CourseExamLeaguePublicationMenu = ({ cachedData }: ProfileMenuInt) => {
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
      <NextLink href="/courses" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Courses</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/library" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Books</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/leagues" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Leagues</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      <NextLink href="/exams" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>Exams</ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
      {user ? (
        <>
          {user.isAdmin && (
            <NextLink href="/admin" passHref>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText>Admin</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </NextLink>
          )}
          <NextLink href="/courses/my-courses" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Course</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
          <NextLink href="/exams/my-books" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Books</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
          <NextLink href="/exams/my-results" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Result</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
          <NextLink href="/leagues/my-leagues" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Leagues</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
          <NextLink href="/exams/my-exams" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Exams</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>{" "}
          <NextLink href="/settings" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText> Profile Settings</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NextLink>
          <NextLink href="/wallet" passHref>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>My Wallet</ListItemText>
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

export default CourseExamLeaguePublicationMenu;
