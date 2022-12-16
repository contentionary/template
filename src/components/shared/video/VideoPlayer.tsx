import React, { useEffect } from "react";
//  mui components
import Box from "@mui/material/Box";
// type/interface and styles
// video player
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/city/index.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const playerRef = React.useRef<videojs.Player | null>(null);

  useEffect(() => {
    const activePlayer = playerRef.current;

    if (activePlayer) {
      activePlayer?.src(options.sources as any);
      activePlayer?.audioOnlyMode(options.audioOnlyMode as boolean);
    } else {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, {
        ...options,
      }).ready(function () {
        playerRef.current = this;
      });
    }
  }, [options, videoRef, playerRef]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <Box data-vjs-player >
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-16-9 vjs-theme-city"
      />
    </Box>
  );
};

export default VideoPlayer;
