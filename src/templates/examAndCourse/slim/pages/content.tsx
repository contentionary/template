import React from "react";
import VideoPlayerPage from "@src/components/VideoPlayerPage";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const VideoPlayer = () => {
  return (
    <ExamAndCourseWrapper
      title="Edtify"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <VideoPlayerPage />
    </ExamAndCourseWrapper>
  );
};

export default VideoPlayer;
