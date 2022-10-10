import {
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import NextLink from "next/link";

const DocumentListButton = ({ pageCount, name, slug, id, courseId }: any) => (
  <NextLink href={`/courses/${slug}/${courseId}/contents/${id}`} passHref>
    <ListItemButton LinkComponent={Link}>
      <ListItemIcon>
        <AutoStoriesOutlinedIcon />
      </ListItemIcon>
      <Stack
        flexGrow={1}
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
