import ActiveLastBreadcrumb from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface LinkInt {
  link: string;
  name: string;
}

export default function Breadcrumbs({
  links,
  currentPage,
}: {
  links: Array<LinkInt>;
  currentPage: LinkInt;
}) {
  return (
    <ActiveLastBreadcrumb aria-label="breadcrumb">
      {links.map(({ link, name }, index) => (
        <Link
          key={`${index}-exam-breadcrumbs`}
          underline="hover"
          color="inherit"
          href={link}
        >
          {name}
        </Link>
      ))}
      <Link
        underline="hover"
        color="text.primary"
        href={currentPage.link}
        aria-current="page"
      >
        {currentPage.name}
      </Link>
    </ActiveLastBreadcrumb>
  );
}
