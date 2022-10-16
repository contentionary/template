import React, { useState } from "react";
//
import Image from "next/image";
//
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
//
import MenuBurger from "@src/assets/icons/menu-hamburger.svg";
// interface and config
import { AppDrawerFunc } from "./interfaceType";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const AppDrawer: AppDrawerFunc = ({ children }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { centre } = cachedData;

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
        sx={{ zIndex: theme.zIndex.drawer + 3 }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Image
              src={centre.logo || DEFAULT_LOGO}
              alt="Contentionary logo"
              width={60}
              height={60}
              style={{ borderRadius: 50 }}
              objectFit="contain"
            />
          </Box>
          <Divider />
          {children}
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
