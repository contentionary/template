import React from "react";
// Mui components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// app components
import LessonPlayer from "./LessonPlayer";
import LessonListDrawer from "./LessonListDrawer";
import LessonDetails from "./LessonDetailsSection";
import Reader from "@src/template/components/shared/DocumentReader";
// interface props, styles and config
import useVideoPageStyle from "@src/template/styles/videoPage";
import { VideoPlayerPagePageFunc } from "./interfaceType";
//
import { queryClient, isServerSide } from "@src/utils";
import { BasePageProps, CourseContentInt } from "@src/utils/interface";
import { useRouter } from "next/router";

const VideoPlayerPage: VideoPlayerPagePageFunc = () => {
  const router = useRouter();
  const theme = useTheme();
  const videoPageStyle = useVideoPageStyle();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courseContent = pageData.courseContent as CourseContentInt;
  const { slug, courseId } = router.query;
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { id, fileUrl, format, status } = courseContent;
  return (
    <Box
      borderTop={1}
      component="main"
      borderBottom={1}
      overflow="hidden"
      position="relative"
      borderColor="divider"
      sx={{ pt: 8, display: "flex" }}
    >
      <Divider
        sx={{
          top: 64,
          width: "100%",
          position: "absolute",
          zIndex: theme.zIndex.drawer + 1,
        }}
      />
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
        {status === "PUBLISHED" ? (
          <>
            {format === "document" ? (
              <Reader fileUrl={fileUrl} allowDownload={false} id={id} />
            ) : (
              <LessonPlayer courseContent={courseContent} />
            )}
          </>
        ) : (
          <Typography
            component="div"
            sx={{
              height: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 1.5,
            }}
          >
            <Typography variant="h5">
              Video has been uploaded successfully, we are optimizing the video
              for different device screen sizes
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, mt: 1 }}>
              Note: This might take a while
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => !isServerSide && window.location.reload()}
            >
              Refresh to Check status
            </Button>
          </Typography>
        )}
        <LessonDetails courseContent={courseContent} />
      </Box>
      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <Fab
          color="primary"
          aria-label="back"
          onClick={() => router.push(`/courses/${slug}/${courseId}`)}
        >
          Back
        </Fab>
      </div>
    </Box>
  );
};

export default VideoPlayerPage;
