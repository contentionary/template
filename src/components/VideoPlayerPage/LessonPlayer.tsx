import React from "react";
//  mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// type/interface
import { LessonPlayerFunc } from "./interfaceType";
import useVideoPageStyle from "@src/styles/videoPage";
// app components
import VideoPlayer from "@src/components/shared/video/VideoPlayer";

const LessonPlayer: LessonPlayerFunc = () => {
  const videoPageStyle = useVideoPageStyle();

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fill: true,
    sources: [
      {
        src: "http://techslides.com/demos/sample-videos/small.webm",
        type: "video/webm",
      },
      {
        src: "http://techslides.com/demos/sample-videos/small.ogv",
        type: "video/ogg",
      },
      {
        src: "http://techslides.com/demos/sample-videos/small.mp4",
        type: "video/mp4",
      },
      {
        src: "http://techslides.com/demos/sample-videos/small.3gp",
        type: "video/3gp",
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
