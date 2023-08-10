import Avatar from "@mui/material/Avatar";

interface Props {
  alt: string;
  src: string;
  sx?: object;
}
export default function ImageAvatars({ alt, src, sx }: Props): JSX.Element {
  return <Avatar alt={alt} src={src} sx={sx} />;
}
