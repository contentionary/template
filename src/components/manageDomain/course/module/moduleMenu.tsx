import Menus from "@src/components/shared/menu";
import Divider from "@mui/material/Divider";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Delete from "./delete";
import AddContent from "./addModules";
import { useMenu } from "@src/utils/hooks";
import UpdateModules from "./updateModules";
import { CourseModuleInt } from "@src/utils/interface";
import { useDialog } from "@src/utils/hooks";

export default function CustomizedMenus({
  courseId,
  centreId,
  module,
  index,
  refetch,
}: {
  courseId: string;
  centreId: string;
  module: CourseModuleInt;
  index: number;
  refetch: Function;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  const { isOpen, openDialog, closeDialog } = useDialog();

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
            refetch={refetch}
          />
          <Delete
            id={module.id}
            centreId={centreId}
            courseId={courseId}
            refetch={refetch}
          />
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => openDialog()} disableRipple>
            <AddCircleOutlineOutlined />
            Add Content
          </MenuItem>
        </div>
      </Menus>
      <AddContent
        id={module.id}
        centreId={centreId}
        CourseId={courseId}
        index={index}
        refetch={refetch}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </>
  );
}
