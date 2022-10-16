import React from "react";
// Mui components
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// app components
import LessonListDrawer from "./LessonListDrawer";
import LessonDetails from "./LessonDetailsSection";
import LessonPlayer from "./LessonPlayer";
import Reader from "@src/components/Document/ReaderSection";
// interface props, styles and config
import useVideoPageStyle from "@src/styles/videoPage";
import { VideoPlayerPagePageFunc } from "./interfaceType";
//
import { queryClient } from "@src/utils";
import { BasePageProps, CourseContentInt } from "@src/utils/interface";

const VideoPlayerPage: VideoPlayerPagePageFunc = () => {
  const theme = useTheme();
  const videoPageStyle = useVideoPageStyle();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courseContent = pageData.courseContent as CourseContentInt;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { id, fileUrl, format } = courseContent;

  return (
    <Box
      component="main"
      position="relative"
      borderBottom={1}
      borderColor="divider"
      sx={{ pt: 8, display: "flex", borderTop: 1 }}
    >
      <LessonListDrawer
        open={open}
        mobileOpen={mobileOpen}
        handleMobileDrawerToggle={handleMobileDrawerToggle}
      />
      {isMatch ? (
        <IconButton
          onClick={handleMobileDrawerToggle}
          className={`${videoPageStyle.lessonListToggler}  ${
            mobileOpen ? "" : "open"
          }`}
        >
          {mobileOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      ) : (
        <IconButton
          onClick={toggleDrawer}
          className={`${videoPageStyle.lessonListToggler}  ${
            open ? "" : "open"
          }`}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      )}
      <Box className={`${videoPageStyle.mainContainer} ${open ? "open" : ""}`}>
        {format === "document" ? (
          <Reader fileUrl={fileUrl} allowDownload={false} id={id} />
        ) : (
          <LessonPlayer courseContent={courseContent} />
        )}
        <LessonDetails courseContent={courseContent} />
      </Box>
    </Box>
  );
};

export default VideoPlayerPage;
