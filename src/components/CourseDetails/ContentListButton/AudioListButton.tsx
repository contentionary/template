import {
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";

const AudioListButton = ({ name, duration, slug, id, courseId }: any) => (
  <NextLink href={`/courses/${slug}/${courseId}/contents/${id}`} passHref>
    <ListItemButton LinkComponent={Link}>
      <ListItemIcon>
        <KeyboardVoiceOutlinedIcon />
      </ListItemIcon>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Typography paragraph mb={0}>
          Audio: {name || "Audio file"}
        </Typography>
        <Typography paragraph mb={0}>
          {duration || "00:00"}
        </Typography>
      </Stack>
    </ListItemButton>
  </NextLink>
);

export default AudioListButton;
