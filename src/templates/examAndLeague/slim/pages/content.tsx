import React from "react";
import VideoPlayerPage from "@src/components/VideoPlayerPage";
import ExamAndLeagueWrapper from "@src/components/Layout/Wrapper/ExamAndLeagueWrapper";

const VideoPlayer = () => {
  return (
    <ExamAndLeagueWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <VideoPlayerPage />
    </ExamAndLeagueWrapper>
  );
};

export default VideoPlayer;
