import Box from "@mui/system/Box";
import {
  FacebookShareButton,
  LinkedinShareButton,
  // PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  // PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

interface Props {
  round?: boolean;
  size?: number;
  shareUrl: string;
}

const ShareContent = ({
  round = true,
  size = 42,
  shareUrl,
}: Props): JSX.Element => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between" }}
      marginTop={3}
    >
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon round={round} size={size} />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon round={round} size={size} />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon round={round} size={size} />
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon round={round} size={size} />
      </WhatsappShareButton>

      {/* <PinterestShareButton media="" url={shareUrl}>
        <PinterestIcon round={round} size={size} />
      </PinterestShareButton> */}

      <TelegramShareButton url={shareUrl} style={{ background: "white" }}>
        <TelegramIcon round={round} size={size} />
      </TelegramShareButton>
    </Box>
  );
};

export default ShareContent;
