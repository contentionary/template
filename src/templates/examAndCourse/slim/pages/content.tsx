import React from "react";
import VideoPlayerPage from "@src/components/VideoPlayerPage";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";

const VideoPlayer = () => {
  return (
    <AcademyWrapper
      title="Contentionary"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <VideoPlayerPage />
    </AcademyWrapper>
  );
};

export default VideoPlayer;
