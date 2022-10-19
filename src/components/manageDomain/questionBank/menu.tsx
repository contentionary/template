import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddOutlined from "@mui/icons-material/AddOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
import { CourseInt } from "@src/utils/interface";

export default function CustomizedMenus({
  folderId,
  centreId,
  courses,
}: {
  folderId: string;
  centreId: string;
  courses: CourseInt[];
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
            href={
              folderId
                ? `/admin/question-bank/create?type=FOLDER&folderId=${folderId}`
                : "/admin/question-bank/create?type=FOLDER"
            }
          >
            <MenuItem disableRipple>
              <AddCircleOutline />
              Create Folder
            </MenuItem>
          </Link>
          <Link
            passHref
            href={
              folderId
                ? `/admin/question-bank/create?type=QuestionBank&folderId=${folderId}`
                : "/admin/question-bank/create?type=QuestionBank"
            }
          >
            <MenuItem disableRipple>
              <AddOutlined />
              Create Question bank
            </MenuItem>
          </Link>

          {folderId && (
            <>
              <Divider sx={{ my: 0.5 }} />
              <Link
                passHref
                href={`/admin/question-bank/${folderId}/update?type=FOLDER`}
              >
                <MenuItem disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
              </Link>
              {!courses.length && <Delete id={folderId} centreId={centreId} />}
            </>
          )}
        </div>
      </Menus>
    </>
  );
}
