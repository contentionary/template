import Button from "@mui/material/Button";
import NextLink from "next/link";

interface Props {
  children: JSX.Element | string;
  href: string;
  className?: string;
  sx?: object;
  disableElevation?: boolean;
  variant?: "outlined" | "contained";
  color?: "primary" | "secondary";
  size?: "large";
}

const Link = ({
  children,
  href,
  className,
  sx,
  disableElevation,
  variant,
  size,
  color,
}: Props) => {
  return (
    <NextLink href={href} passHref>
      <Button
        sx={sx}
        className={className}
        disableElevation={disableElevation}
        variant={variant}
        color={color}
        size={size}
      >
        {children}
      </Button>
    </NextLink>
  );
};
export default Link;
