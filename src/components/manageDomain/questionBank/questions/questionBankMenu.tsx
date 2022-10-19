import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "../delete";
import AddQuestion from "./addQuestion";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
import ButtonComponent from "@src/components/shared/button";

export default function CustomizedMenus({
  id,
  centreId,
}: {
  id: string;
  centreId: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();

  return (
    <>
      <ButtonComponent onClick={openMenu} variant="contained">
        Question bank menu
      </ButtonComponent>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link passHref href={`/admin/question-bank/${id}/update?type=FOLDER`}>
            <MenuItem disableRipple>
              <EditIcon />
              Edit Question Bank
            </MenuItem>
          </Link>
          <Delete id={id} centreId={centreId} />
          <Divider sx={{ my: 0.5 }} />
          <AddQuestion CourseId={id} centreId={centreId} index={1} />
        </div>
      </Menus>
    </>
  );
}
