import Box from "@mui/material/Box";

interface IVideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src }) => {
  return (
    <Box data-vjs-player>
      <iframe
        src={`${src}?autoplay=false`}
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
