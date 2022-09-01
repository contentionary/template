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
// interface

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
    width: 18,
    height: 18,
    size: 1,
    mr: 1,
  };

  return (
    <NavbarMenu title="Resources">
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Box p={2}>
              <Typography mb={2} variant="h5" color="primary">
                Resources
              </Typography>
              <Typography variant="h6">Features</Typography>
              <Typography variant="caption" component="p">
                Everything you do in contentionary revolves around your Centre.
                You can create free Centre(s) where you can teach, publish and
                test your subscribers
              </Typography>
              <NextLink href="/" passHref>
                <MuiLink fontSize="small">Learn more</MuiLink>
              </NextLink>
              <Typography mt={2} variant="h6">
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
          <Grid item xs={6} sx={{ bgcolor: "#FFF8F0" }}>
            <Box p={2}>
              <Typography variant="h6" color="primary">
                How to create a centre
              </Typography>
              <ResourceMenuLink href="https://www.contentionary.group/resources/creating-a-centre">
                Learn how to create a center here
              </ResourceMenuLink>
              <Typography mt={2} variant="h6" color="primary">
                How to set a exam
              </Typography>
              <ResourceMenuLink href="https://www.contentionary.group/resources/creating-a-new-exam">
                Learn how to set a public or private exam for your candidates
              </ResourceMenuLink>
              <Typography mt={2} variant="h6" color="primary" lineHeight={1.25}>
                How to create courses in modules and Upload Publications
              </Typography>
              <ResourceMenuLink href="https://www.contentionary.group/resources/hosting-online-courses">
                Learn how to create a course and add publication in your centre
              </ResourceMenuLink>
              <Typography mt={2} variant="h6" color="primary">
                Our API Integration
              </Typography>
              <ResourceMenuLink href="https://contentionary.com/integration">
                Learn our to integrate our software to your personal website
              </ResourceMenuLink>
              <Typography mt={2} variant="h6" color="primary" lineHeight={1.25}>
                How to monetize your publication and other contents available in
                your centre
              </Typography>
              <ResourceMenuLink href="https://www.contentionary.group/resources/creating-a-new-publication">
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
