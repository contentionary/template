import React from "react";
//  mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// type/interface
import useVideoPageStyle from "@src/styles/videoPage";
// app components
import VideoPlayer from "@src/components/shared/video/VideoPlayer";
import { CourseContentInt } from "@src/utils/interface";

const LessonPlayer = ({
  courseContent,
}: {
  courseContent: CourseContentInt;
}) => {
  const videoPageStyle = useVideoPageStyle();

  return (
    <Box className={videoPageStyle.playerContainer}>
      <Container className="player-box">
        {courseContent.fileUrl ? (
          <VideoPlayer src={courseContent.fileUrl} />
        ) : (
          <Typography>Video not available yet</Typography>
        )}
      </Container>
    </Box>
  );
};

export default LessonPlayer;
