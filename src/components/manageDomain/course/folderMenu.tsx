import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Add from "@mui/icons-material/Add";
import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

export default function CustomizedMenus({
  folderId,
  centreId,
  coursesLength,
}: {
  folderId: string;
  centreId: string;
  coursesLength: boolean;
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
                ? `/admin/course/create?type=FOLDER&folderId=${folderId}`
                : "/admin/course/create?type=FOLDER"
            }
          >
            <MenuItem disableRipple>
              <AddCircleOutline />
              Create Folder
            </MenuItem>
          </Link>
          <Link passHref href="/admin/course/create?type=FOLDER">
            <MenuItem disableRipple>
              <Add />
              Create Course
            </MenuItem>
          </Link>
          {folderId && (
            <>
              <Divider sx={{ my: 0.5 }} />
              <Link
                passHref
                href={`/admin/course/update/${folderId}?type=FOLDER`}
              >
                <MenuItem disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
              </Link>
              {!coursesLength && <Delete id={folderId} centreId={centreId} />}
            </>
          )}
        </div>
      </Menus>
    </>
  );
}
