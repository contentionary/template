import React from "react";
//  mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// type/interface
import useVideoPageStyle from "@src/styles/videoPage";
// app components
import VideoPlayer from "@src/components/shared/video/VideoPlayer";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const LessonPlayer = () => {
  const videoPageStyle = useVideoPageStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fill: true,
    sources: [
      {
        src: pageData.courseContent.fileUrl,
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
