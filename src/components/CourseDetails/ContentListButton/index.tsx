import VideoListButton from "./VideoListButton";
import AudioLIstButton from "./AudioListButton";
import DocumentListButton from "./DocumentListButton";

const ContentListButton: any = (props: any) => {
  switch (props.format) {
    case "video":
      return <VideoListButton {...props} />;
    case "audio":
      return <AudioLIstButton {...props} />;
    case "document":
      return <DocumentListButton {...props} />;
  }
};

export default ContentListButton;
