import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
// import Visibility from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";

export default function CustomizedMenus({
  id,
  centreId,
  slug,
  folderId,
}: {
  id: string;
  centreId: string;
  refetch: Function;
  slug: string;
  folderId: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link
            passHref
            href={`/admin/publication/${folderId}/update?type=FOLDER`}
          >
            <MenuItem disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
          </Link>
          {/* <Link passHref href={`/courses/${slug}/${id}`}>
            <MenuItem disableRipple>
              <Visibility />
              View course
            </MenuItem>
          </Link> */}
          <Delete id={folderId} centreId={centreId} />
        </div>
      </Menus>
    </>
  );
}
