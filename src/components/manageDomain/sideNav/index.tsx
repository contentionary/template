import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import PowerSettingsNewOutlined from "@mui/icons-material/PowerSettingsNewOutlined";
import CallOutlined from "@mui/icons-material/CallOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import ShareCentre from "./share";
import Modules from "./modules";
import CentreContact from "./contact";
import CentreSettings from "./settings";

import Image from "@src/components/shared/image";
import config from "@src/utils/config";

import { useRouter } from "next/router";
import { cache } from "@src/utils";
import { useDialog } from "@src/hooks";
import { useContext } from "react";
import { CentreContext } from "@src/pages/admin";

const SideNav = (): JSX.Element => {
  const router = useRouter();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [centre, setCentre] = useContext(CentreContext);
  const user = cache.get("user");

  const pages = [{ title: "Home", icon: <HomeOutlinedIcon />, link: "/" }];

  return (
    <div style={{ paddingTop: 20, background: "#FCFCFC" }}>
      <Toolbar>
        <Image
          src="/images/logo.png"
          alt="Contentionary logo"
          width={200}
          height={40}
        />
      </Toolbar>
      <List sx={{ marginTop: 6 }}>
        <Modules centre={centre} />
        {pages.map(({ icon, title }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "#333333",
                  fontWeight: 500,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
                primary={title}
              />
            </ListItemButton>
          </ListItem>
        ))}

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
        <CentreSettings centre={centre} setCentre={setCentre} />
        <ShareCentre
          contentToShare={`${config.URL.APP}/${centre.slug}/${centre.id}?referralCode=${user?.id}`}
          userId={user?.id}
        />
        <ListItem disablePadding onClick={() => router.push("/")}>
          <ListItemButton>
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
