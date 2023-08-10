import {
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import PlayIcon from "@src/template/assets/icons/play.svg";

const VideoListButton = ({ name, duration, slug, id, courseId }: any) => (
  <NextLink href={`/courses/${slug}/${courseId}/contents/${id}`} passHref>
    <ListItemButton LinkComponent={Link}>
      <ListItemIcon>
        <PlayIcon fill="secondary.main" style={{ transform: "scale(0.75)" }} />
      </ListItemIcon>
      <Stack
        flexGrow={1}
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Typography paragraph mb={0}>
          Video: {name || "Video name"}
        </Typography>
        <Typography paragraph mb={0}>
          {duration || ""}
        </Typography>
      </Stack>
    </ListItemButton>
  </NextLink>
);

export default VideoListButton;
