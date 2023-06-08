import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Visibility from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";

export default function CustomizedMenus({
  centreId,
  id,
}: {
  centreId: string;
  id: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link passHref href={`/admin/league/${id}/subscribers`}>
            <MenuItem disableRipple>
              <PeopleAltOutlined />
              Subscribers
            </MenuItem>
          </Link>
          <Link passHref href={`/leagues/${id}`}>
            <MenuItem disableRipple>
              <Visibility />
              View league
            </MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <Delete id={id} centreId={centreId} />
        </div>
      </Menus>
    </>
  );
}
