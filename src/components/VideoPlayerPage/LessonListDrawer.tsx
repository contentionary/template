import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
//  app components
import LessonList from "./LessonList";

// interface props, styles and config
import { LessonListDrawerFunc } from "./interfaceType";
import useVideoPageStyle from "@src/styles/videoPage";

const LessonListDrawer: LessonListDrawerFunc = ({
  open,
  window,
  mobileOpen,
  handleMobileDrawerToggle,
}) => {
  const theme = useTheme();
  const videoPageStyle = useVideoPageStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      {isMatch ? (
        <Fragment>
          <Drawer
            open={mobileOpen}
            container={container}
            variant="temporary"
            onClose={handleMobileDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 280,
              },
            }}
          >
            <Box className={videoPageStyle.drawerHeader}>
              <Typography variant="h6" mb={0}>
                Course Content
              </Typography>
            </Box>
            <LessonList />
          </Drawer>
        </Fragment>
      ) : (
        <Drawer
          className={`${videoPageStyle.lessonListDrawer} ${open ? "open" : ""}`}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Box className={videoPageStyle.drawerHeader}>
            <Typography variant="h6" mb={0}>
              Course Content
            </Typography>
          </Box>
          <LessonList />
        </Drawer>
      )}
    </Fragment>
  );
};

export default LessonListDrawer;
