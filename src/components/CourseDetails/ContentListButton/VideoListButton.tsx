import {
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import PlayIcon from "@src/assets/icons/play.svg";

const VideoListButton = ({ name, duration, slug, id, courseId }: any) => (
  <NextLink href={`/courses/${slug}/${courseId}/contents/${id}`} passHref>
    <ListItemButton LinkComponent={Link}>
      <ListItemIcon>
        <PlayIcon fill="secondary.main" style={{ transform: "scale(0.75)" }} />
      </ListItemIcon>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Typography paragraph mb={0}>
          Video: {name || "Video name"}
        </Typography>
        <Typography paragraph mb={0}>
          {duration || "00:00"}
        </Typography>
      </Stack>
    </ListItemButton>
  </NextLink>
);

export default VideoListButton;
