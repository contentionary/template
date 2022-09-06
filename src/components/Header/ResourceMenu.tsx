import React from "react";
// next components
import NextLink from "next/link";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//
import { useTheme } from "@mui/material/styles";
//
import { Link as MuiLink } from "@mui/material";
// components and styles
import NavbarMenu from "@src/components/shared/dropdown/NavbarMenu";
// icons/icons
import PlayIcon from "@src/assets/icons/play.svg";
import TickAvatar from "@src/components/shared/TickAvatar";
// interface and config
import config from "@src/utils/config";

interface ResourceMenuLinkInt {
  children: React.ReactNode;
  href: string;
}

const PlayAvatar = () => {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        backgroundColor: "transparent",
        border: `2px solid ${theme.palette.primary.main}`,
        height: 20,
        width: 20,
      }}
    >
      <PlayIcon style={{ transform: "scale(0.5)" }} />
    </Avatar>
  );
};

const ResourceMenuLink = ({ children, href }: ResourceMenuLinkInt) => {
  return (
    <NextLink href={href} passHref>
      <MuiLink
        variant="caption"
        underline="none"
        color="inherit"
        sx={{
          mb: 1,
          gap: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {children} <PlayAvatar />
      </MuiLink>
    </NextLink>
  );
};

const ResourceMenu = () => {
  const smAvatarProps = {
    width: 16,
    height: 16,
    size: 1,
    mr: 1,
  };

  return (
    <NavbarMenu title="Resources">
      <React.Fragment>
        <Grid container spacing={0} columns={24}>
          <Grid item xs={13}>
            <Box p={2.5}>
              <Typography mb={2} fontSize="medium" variant="h4" color="primary">
                RESOURCES
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                Features
              </Typography>
              <Typography variant="caption" component="p">
                Everything you do in contentionary revolves around your Centre.
                You can create free Centre(s) where you can teach, publish and
                test your subscribers
              </Typography>
              <NextLink href="/" passHref>
                <MuiLink fontSize="small">Learn more</MuiLink>
              </NextLink>
              <Typography
                mt={2}
                display="block"
                variant="caption"
                fontWeight="bold"
              >
                Your Business Categories
              </Typography>
              <List>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Recruitment Firms" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Schools" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Human Resource Departments" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Private Educators and Online Tutors" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Private Examiners" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Authors and Researchers" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Study Centres" />
                </ListItem>
                <ListItem sx={{ p: 0, mb: 0 }}>
                  <TickAvatar {...smAvatarProps} />
                  <ListItemText secondary="Teachers" />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={11} sx={{ bgcolor: "#FFF8F0" }}>
            <Box p={2.5}>
              <NextLink
                href={`${config.URL.GROUP}resources/creating-a-centre`}
                passHref
              >
                <MuiLink
                  mb={1}
                  variant="caption"
                  fontWeight="bold"
                  color="primary"
                  display="block"
                  underline="none"
                >
                  How to create a centre
                </MuiLink>
              </NextLink>
              <ResourceMenuLink
                href={`${config.URL.GROUP}resources/creating-a-centre`}
              >
                Learn how to create a center here
              </ResourceMenuLink>
              <NextLink
                href={`${config.URL.GROUP}resources/creating-a-new-exam`}
                passHref
              >
                <MuiLink
                  mb={1}
                  display="block"
                  color="primary"
                  underline="none"
                  fontWeight="bold"
                  variant="caption"
                >
                  How to set a exam
                </MuiLink>
              </NextLink>
              <ResourceMenuLink
                href={`${config.URL.GROUP}resources/creating-a-new-exam`}
              >
                Learn how to set a public or private exam for your candidates
              </ResourceMenuLink>
              <NextLink
                href={`${config.URL.GROUP}resources/hosting-online-courses`}
                passHref
              >
                <MuiLink
                  mb={1}
                  display="block"
                  color="primary"
                  underline="none"
                  lineHeight={1.25}
                  variant="caption"
                  fontWeight="bold"
                >
                  How to create courses in modules and Upload Publications
                </MuiLink>
              </NextLink>
              <ResourceMenuLink
                href={`${config.URL.GROUP}resources/hosting-online-courses`}
              >
                Learn how to create a course and add publication in your centre
              </ResourceMenuLink>
              <NextLink href={`${config.URL.APP}integration`} passHref>
                <MuiLink
                  variant="caption"
                  fontWeight="bold"
                  display="block"
                  color="primary"
                  underline="none"
                >
                  Our API Integration
                </MuiLink>
              </NextLink>
              <ResourceMenuLink href={`${config.URL.APP}integration`}>
                Learn our to integrate our software to your personal website
              </ResourceMenuLink>
              <NextLink
                href={`${config.URL.GROUP}resources/creating-a-new-publication`}
                passHref
              >
                <MuiLink
                  variant="caption"
                  fontWeight="bold"
                  color="primary"
                  display="block"
                  underline="none"
                  lineHeight={1.25}
                >
                  How to monetize your publication and other contents available
                  in your centre
                </MuiLink>
              </NextLink>
              <ResourceMenuLink
                href={`${config.URL.GROUP}resources/creating-a-new-publication`}
              >
                You can monetize any of your content in your centre.
              </ResourceMenuLink>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    </NavbarMenu>
  );
};

export default ResourceMenu;
