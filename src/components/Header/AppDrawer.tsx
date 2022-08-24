import React, { useState } from "react";
//
import Image from "next/image";
import NextLink from "next/link";
//
import {
  Box,
  List,
  Drawer,
  Divider,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
//
import ContentionaryLogo from "@src/assets/images/logo.png";
import MenuBurger from "@src/assets/icons/menu-hamburger.svg";

const pages = ["Course", "Exams", "About Us", "Login", "Signup"];

const AppDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Image
              src={ContentionaryLogo}
              alt="Contentionary logo"
              width={180}
              height={33}
            />
          </Box>
          <Divider />
          <List>
            {pages.map((page, index) => (
              <NextLink href={`/#${page}`} passHref key={index}>
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemText>{page}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </NextLink>
            ))}
          </List>
        </Box>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuBurger />
      </IconButton>
    </React.Fragment>
  );
};

export default AppDrawer;
