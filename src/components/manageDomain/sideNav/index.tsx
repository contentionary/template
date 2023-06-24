import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/icons-material/Link";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import PowerSettingsNewOutlined from "@mui/icons-material/PowerSettingsNewOutlined";
import CallOutlined from "@mui/icons-material/CallOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Payment from "@mui/icons-material/Payment";

import Image from "@src/components/shared/image";
// Next
import NextLink from "next/link";

import { cache, DEFAULT_LOGO, queryClient } from "@src/utils";
import { useDialog } from "@src/hooks";
import { BasePageProps, CentreProps } from "@src/utils/interface";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import dynamic from "next/dynamic";

const SideNav = (): JSX.Element => {
  const CentreContact = dynamic(() => import("./contact"));
  const ShareCentre = dynamic(() => import("./share"));
  const { isOpen, openDialog, closeDialog } = useDialog();
  const user = cache.get("user");
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = cachedData.centre as unknown as CentreProps;
  return (
    <div style={{ paddingTop: 20, background: "#FCFCFC" }}>
      <Toolbar>
        <NextLink href="/" passHref>
          <Image
            src={centre?.logo || DEFAULT_LOGO}
            alt={`${centre.name} logo`}
            width={71}
            height={70}
            style={{ cursor: "pointer" }}
          />
        </NextLink>
      </Toolbar>
      <List sx={{ marginTop: 6 }}>
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
        {centre.template === "portfolio" && (
          <ListItem disablePadding>
            <NextLink href="/admin/portfolio" passHref>
              <ListItemButton LinkComponent={Link}>
                <ListItemIcon>
                  <Payment />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "#333333",
                    fontWeight: 500,
                    fontSize: 16,
                    fontStyle: "normal",
                  }}
                  primary="Portfolio"
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        )}
        {centre.subscriptionModel === "SUBSCRIPTION" && (
          <ListItem disablePadding>
            <NextLink href="/admin/payment-plan" passHref>
              <ListItemButton LinkComponent={Link}>
                <ListItemIcon>
                  <Payment />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "#333333",
                    fontWeight: 500,
                    fontSize: 16,
                    fontStyle: "normal",
                  }}
                  primary="Payment Plan"
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        )}
        {user?.isAdmin && (
          <ListItem disablePadding>
            <NextLink href="/admin/wallet" passHref>
              <ListItemButton LinkComponent={Link}>
                <ListItemIcon>
                  <WalletOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "#333333",
                    fontWeight: 500,
                    fontSize: 16,
                    fontStyle: "normal",
                  }}
                  primary="Centre Wallet"
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        )}
        <ListItem disablePadding>
          <NextLink href="/admin/template" passHref>
            <ListItemButton LinkComponent={Link}>
              <ListItemIcon>
                <LanguageOutlined />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "#333333",
                  fontWeight: 500,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
                primary=" Manage Website"
              />
            </ListItemButton>
          </NextLink>
        </ListItem>
        <ShareCentre
          // contentToShare={`${config.URL.APP}/${centre.slug}/${centre.id}?referralCode=${user?.id}`}
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
