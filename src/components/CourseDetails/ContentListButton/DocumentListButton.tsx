import {
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import NextLink from "next/link";

const DocumentListButton = ({ name, pageCount, slug, index }: any) => (
  <NextLink href={`/courses/${slug}/lesson/${index}`} passHref>
    <ListItemButton LinkComponent={Link}>
      <ListItemIcon>
        <AutoStoriesOutlinedIcon />
      </ListItemIcon>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Typography paragraph mb={0}>
          Document: {name}
        </Typography>
        <Typography paragraph mb={0}>
          {pageCount} pages
        </Typography>
      </Stack>
    </ListItemButton>
  </NextLink>
);

export default DocumentListButton;
