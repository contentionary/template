import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import AddOutlined from "@mui/icons-material/AddOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import QuestionAnswerOutlined from "@mui/icons-material/QuestionAnswerOutlined";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import Delete from "./delete";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
import { ExamInt } from "@src/utils/interface";

export default function CustomizedMenus({
  folderId,
  centreId,
  exams,
}: {
  folderId: string;
  centreId: string;
  exams: ExamInt[];
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();

  return (
    <>
      <IconButton onClick={openMenu}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link
            passHref
            href={
              folderId
                ? `/admin/exam/create?type=FOLDER&folderId=${folderId}`
                : "/admin/exam/create?type=FOLDER"
            }
          >
            <MenuItem disableRipple>
              <AddCircleOutline />
              Create folder
            </MenuItem>
          </Link>
          <Link
            passHref
            href={
              folderId
                ? `/admin/exam/create?type=EXAM&folderId=${folderId}`
                : "/admin/exam/create?type=EXAM"
            }
          >
            <MenuItem disableRipple>
              <AddOutlined />
              Create exams
            </MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <Link passHref href="/admin/question-bank">
            <MenuItem disableRipple>
              <QuestionAnswerOutlined />
              Question bank
            </MenuItem>
          </Link>

          {folderId && (
            <>
              <Link
                passHref
                href={`/admin/exam/${folderId}/update?type=FOLDER`}
              >
                <MenuItem disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
              </Link>
              {!exams.length && <Delete id={folderId} centreId={centreId} />}
            </>
          )}
        </div>
      </Menus>
    </>
  );
}
