import Menus from "@src/components/shared/menu";
// import MenuItem from "@mui/material/MenuItem";
// import DeleteOutline from "@mui/icons-material/DeleteOutline";
// import Divider from "@mui/material/Divider";
// import Delete from "./delete";
// import AddQuestion from "./addQuestion";
import { useDialog } from "@src/hooks";
import { useMenu } from "@src/utils/hooks";
// import { SectionInt } from "./interface";
// import UpdateSection from "./updateSection ";
import ButtonComponent from "@src/components/shared/button";

export default function Menu() {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  const { isOpen, openDialog, closeDialog } = useDialog();
// {
//   examId,
//   centreId,
//   section,
// }: {
//   examId: string;
//   centreId: string;
//   section: SectionInt;
// }
  return (
    <>
      <ButtonComponent
        variant="contained"
        onClick={openMenu} 
      >
        Exam Result Menu
      </ButtonComponent>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div> heelo
          {/* <UpdateSection
            section={section}
            examId={examId}
            centreId={centreId}
          />
          <Delete
            closeDialog={closeDialog}
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
          />  */}
        </div>
      </Menus>
    </>
  )
}
