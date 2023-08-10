import React from "react";
//  mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// type/interface
import useVideoPageStyle from "@src/template/styles/videoPage";
// app components
import VideoPlayer from "@src/template/components/shared/video/VideoPlayer";
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
        <VideoPlayer src={courseContent.fileUrl} />
      </Container>
    </Box>
  );
};

export default LessonPlayer;
