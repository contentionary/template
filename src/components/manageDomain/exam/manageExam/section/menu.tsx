import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Divider from "@mui/material/Divider";
import MoreHorizOutlined from "@mui/icons-material/MoreHorizOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import AddQuestion from "./addQuestion";
import { useDialog } from "@src/hooks";
import { useMenu } from "@src/utils/hooks";
import { SectionInt } from "./interface";
import UpdateSection from "./updateSection ";

export default function SectionMenu({
  examId,
  centreId,
  section,
  toggleToast,
  refetch,
}: {
  examId: string;
  centreId: string;
  section: SectionInt;
  toggleToast: Function;
  refetch: Function;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  const { isOpen, openDialog, closeDialog } = useDialog();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHorizOutlined />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <UpdateSection
            section={section}
            examId={examId}
            centreId={centreId}
            toggleToast={toggleToast}
            refetch={refetch}
          />
          <Delete
            closeDialog={closeDialog}
            toggleToast={toggleToast}
            isOpen={isOpen}
            url={`/centre/${centreId}/exam/${examId}/question-section/${section.id}`}
          >
            <MenuItem onClick={() => openDialog()} disableRipple>
              <DeleteOutline />
              Delete
            </MenuItem>
          </Delete>
          <Divider sx={{ my: 0.5 }} />
          <AddQuestion
            examId={examId}
            centreId={centreId}
            sectionId={section.id}
            toggleToast={toggleToast}
            refetch={refetch}
          />
        </div>
      </Menus>
    </>
  );
}
