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
import { PublicationInt } from "@src/utils/interface";

const PublicationsMenu = ({ pageData }: Record<string, any>) => {
  const listMenuStyle = useListMenuStyle();
  const publications = pageData.publicationData
    .publications as PublicationInt[];

  return (
    <Box top={32} position="sticky">
      <Typography mb={2} variant="h5">
        Folders
      </Typography>
      <List disablePadding className={listMenuStyle.listMenuRoot}>
        {publications
          .filter((publication) => publication.type === "FOLDER")
          .map((publication, index) => (
            <ListItem key={`${index}-publication-folder`} disablePadding>
              <NextLink href={`/library?folderId=${publication.id}`} passHref>
                <ListItemButton component={MuiLink}>
                  <ListItemText primary={publication.name} />
                </ListItemButton>
              </NextLink>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default PublicationsMenu;
