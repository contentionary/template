import React, { useState } from "react";
//
import Image from "next/image";
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
//
import ContentionaryLogo from "@src/assets/images/logo.png";
import MenuBurger from "@src/assets/icons/menu-hamburger.svg";

const AppDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
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
          <Box sx={{ px: 2, py: 1.5 }}>
            <Image
              src={ContentionaryLogo}
              alt="Contentionary logo"
              width={210}
              height={40}
            />
          </Box>
          <Divider />
          <List>
            {[
              "Apps",
              "Resources",
              "Pricing",
              "Marketplace",
              "Login",
              "Signup",
            ].map((page, index) => (
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
