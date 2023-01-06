import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";

export default function CustomizedMenus({
  centreId,
  folderId,
}: {
  centreId: string;
  folderId: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link
            passHref
            href={
              folderId
                ? `/admin/publication/create?type=FOLDER&folderId=${folderId}`
                : "/admin/publication/create?type=FOLDER"
            }
          >
            <MenuItem disableRipple>
              <EditIcon />
              Create Folder
            </MenuItem>
          </Link>
          <Link
            passHref
            href={
              folderId
                ? `/admin/publication/create?type=PUBLICATION&folderId=${folderId}`
                : "/admin/publication/create?type=PUBLICATION"
            }
          >
            <MenuItem disableRipple>
              <EditIcon />
              Create publication
            </MenuItem>
          </Link>
          {folderId && (
            <>
              <Divider sx={{ my: 0.5 }} />
              <Link
                passHref
                href={`/admin/publication/${folderId}/update?type=FOLDER`}
              >
                <MenuItem disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
              </Link>
              <Delete id={folderId} centreId={centreId} />
            </>
          )}
        </div>
      </Menus>
    </>
  );
}
