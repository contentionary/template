import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Visibility from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";

export default function CustomizedMenus({
  centreId,
  id,
  slug,
}: {
  centreId: string;
  id: string;
  slug: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link passHref href={`/library/${slug}/${id}`}>
            <MenuItem disableRipple>
              <Visibility />
              View publication
            </MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <Delete id={id} centreId={centreId} />
        </div>
      </Menus>
    </>
  );
}
