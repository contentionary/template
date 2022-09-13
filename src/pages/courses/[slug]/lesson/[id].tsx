import React from "react";
import type { NextPage } from "next";
import VideoPlayerPage from "@src/components/VideoPlayerPage";
import Wrapper from "@src/components/Wrapper";

const VideoPlayer: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <VideoPlayerPage />
    </Wrapper>
  );
};

export default VideoPlayer;
