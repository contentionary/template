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
import { CourseListInt } from "@src/utils/interface";

const CoursesMenu = ({ pageData }: Record<string, any>) => {
  const listMenuStyle = useListMenuStyle();
  const coursesListData = pageData.courseList as CourseListInt;

  return (
    <Box top={32} position="sticky">
      <Typography mb={2} variant="h5">
        Folders
      </Typography>
      <List disablePadding className={listMenuStyle.listMenuRoot}>
        {coursesListData.courses
          .filter((course) => course.type === "FOLDER")
          .map((course, index) => (
            <ListItem key={`${index}-course-folder`} disablePadding>
              <NextLink href={`/library?folderId=${course.id}`} passHref>
                <ListItemButton component={MuiLink}>
                  <ListItemText primary={course.name} />
                </ListItemButton>
              </NextLink>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default CoursesMenu;
