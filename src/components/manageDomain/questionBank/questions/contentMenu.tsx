import Menus from "@src/components/shared/menu";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import { useMenu } from "@src/utils/hooks";
import UpdateModules from "./updateModules";
import { CourseContentInt } from "@src/utils/interface";

export default function CustomizedMenus({
  courseId,
  centreId,
  module,
}: {
  courseId: string;
  centreId: string;
  module: CourseContentInt;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <p>
          <UpdateModules
            questionBankId={courseId}
            centreId={centreId}
            module={module}
            content={true}
          />
          <Delete
            id={module.id}
            centreId={centreId}
            questionBankId={courseId}
          />
        </p>
      </Menus>
    </>
  );
}
