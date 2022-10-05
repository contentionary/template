import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/icons-material/Link";

import PowerSettingsNewOutlined from "@mui/icons-material/PowerSettingsNewOutlined";
import CallOutlined from "@mui/icons-material/CallOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import ShareCentre from "./share";
import Modules from "./modules";
import CentreContact from "./contact";

import Image from "@src/components/shared/image";
import config from "@src/utils/config";
// Next
import NextLink from "next/link";

import { cache, DEFAULT_LOGO, queryClient } from "@src/utils";
import { useDialog } from "@src/hooks";
import { BasePageProps, CentreProps } from "@src/utils/interface";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";

const SideNav = (): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const user = cache.get("user");
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = pageData.centre as CentreProps;

  return (
    <div style={{ paddingTop: 20, background: "#FCFCFC" }}>
      <Toolbar>
        <Image
          src={centre.logo || DEFAULT_LOGO}
          alt="Contentionary logo"
          width={200}
          height={40}
        />
      </Toolbar>
      <List sx={{ marginTop: 6 }}>
        <Modules centre={centre} />
        <ListItem disablePadding>
          <NextLink href="/admin" passHref>
            <ListItemButton LinkComponent={Link}>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "#333333",
                  fontWeight: 500,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
                primary="Dashboard"
              />
            </ListItemButton>
          </NextLink>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => {
            openDialog();
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <CallOutlined />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: "#333333",
                fontWeight: 500,
                fontSize: 16,
                fontStyle: "normal",
              }}
              primary="Contact"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <NextLink href="/admin/centre" passHref>
            <ListItemButton LinkComponent={Link}>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "#333333",
                  fontWeight: 500,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
                primary="Manage centre"
              />
            </ListItemButton>
          </NextLink>
        </ListItem>
        <ShareCentre
          contentToShare={`${config.URL.APP}/${centre.slug}/${centre.id}?referralCode=${user?.id}`}
          userId={user?.id}
        />
        <ListItem disablePadding>
          <NextLink href="/" passHref>
            <ListItemButton LinkComponent={Link}>
              <ListItemIcon>
                <PowerSettingsNewOutlined />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "#333333",
                  fontWeight: 500,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
                primary="Exit Admin"
              />
            </ListItemButton>
          </NextLink>
        </ListItem>
      </List>
      <CentreContact
        centre={centre}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </div>
  );
};

export default SideNav;
