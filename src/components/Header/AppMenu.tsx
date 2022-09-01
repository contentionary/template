import React from "react";
// next components
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//
// components and styles
import NavbarMenu from "@src/components/shared/dropdown/NavbarMenu";
// icons/icons
import TickAvatar from "@src/components/shared/TickAvatar";
// interface

const AppMenu = () => {
  const smAvatarProps = {
    width: 16,
    height: 16,
    size: 1,
    mr: 1,
  };

  return (
    <NavbarMenu title="Apps">
      <React.Fragment>
        <Grid container spacing={0} columns={24}>
          <Grid item xs={13}>
            <Box p={2.5}>
              <Typography variant="h6">Our Solution</Typography>
              <Typography variant="caption" component="p">
                Providing the safest, most seamless Testing and Learning
                solutions to suit your business needs, anywhere in the world.
              </Typography>
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
              </List>
            </Box>
          </Grid>
          <Grid item xs={11} sx={{ bgcolor: "#FFF8F0" }}>
            <Box p={2.5}>
              <Typography variant="h6" color="primary">
                Talent Assessment
              </Typography>
              <Typography variant="caption" component="p">
                Use contentionary to assess/screen unlimited number of candidate
                remotely, Secured and Easy.
              </Typography>
              <Typography mt={2} variant="h6" color="primary">
                E-learning
              </Typography>
              <Typography variant="caption" component="p">
                Use your center to teach online (in modules), set assessments
                and share notes to your subscribers.
              </Typography>
              <Typography mt={2} variant="h6" color="primary">
                Sales
              </Typography>
              <Typography variant="caption" component="p">
                With your centre, you can upload and sell your contents
                independently.
              </Typography>
              <Typography mt={2} variant="h6" color="primary">
                Our API Integration
              </Typography>
              <Typography variant="caption" component="p">
                Integrate our API to your personal website and access all
                features you need to teach, test candidates or/and publish
                contents
              </Typography>
              <Typography mt={2} variant="h6" color="primary">
                Contentionary Marketplace
              </Typography>
              <Typography variant="caption" component="p">
                Are you looking for contents, preparatory exams, courses, and
                other virtual materials to equip yourselves? visit marketplace
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    </NavbarMenu>
  );
};

export default AppMenu;
