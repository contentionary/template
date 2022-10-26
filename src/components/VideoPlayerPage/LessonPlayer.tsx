import React from "react";
//  mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fill: true,
    audioOnlyMode: courseContent.format === "audio",
    sources: [
      {
        src: courseContent.fileUrl,
      },
    ],
  };

  return (
    <Box className={videoPageStyle.playerContainer}>
      <Container className="player-box">
        <VideoPlayer options={videoJsOptions} />
      </Container>
    </Box>
  );
};

export default LessonPlayer;
