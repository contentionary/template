import Menus from "@src/components/shared/menu";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
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
import ParticipantScript from "./participantScript";

export default function TableMenu({
  examId,
  centreId,
  result,
}: {
  examId: string;
  centreId: string;
  result: any;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  const { isOpen, openDialog, closeDialog } = useDialog();

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVert />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <ParticipantScript
            result={result}
            examId={examId}
            centreId={centreId}
          />
          {/*     <Delete
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
  );
}
