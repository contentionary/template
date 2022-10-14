import Menus from "@src/components/shared/menu";
import Divider from "@mui/material/Divider";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import AddContent from "./addModules";
import { useMenu } from "@src/utils/hooks";
import UpdateModules from "./updateModules";
import { CourseModuleInt } from "@src/utils/interface";

export default function CustomizedMenus({
  courseId,
  centreId,
  module,
}: {
  courseId: string;
  centreId: string;
  module: CourseModuleInt;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <UpdateModules
            courseId={courseId}
            centreId={centreId}
            module={module}
          />
          <Delete id={module.id} centreId={centreId} courseId={courseId} />
          <Divider sx={{ my: 0.5 }} />
          <AddContent id={module.id} centreId={centreId} CourseId={courseId} />
        </div>
      </Menus>
    </>
  );
}
