import Box from "@mui/material/Box";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/city/index.css";

interface IVideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src }) => {
  return (
    <Box data-vjs-player>
      <iframe
        src={`${src}?autoplay=true`}
        loading="lazy"
        style={{
          border: "none",
          height: "550px",
          width: "100%",
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default VideoPlayer;
