import NextLink from "next/link";
interface Props {
  children: JSX.Element | string;
  passHref: any;
  href: string;
  className?: string;
}
const Link = ({ children, href, passHref, className }: Props) => {
  return (
    <NextLink href={href} passHref={passHref} className={className}>
      {children}
    </NextLink>
  );
};
export default Link;
