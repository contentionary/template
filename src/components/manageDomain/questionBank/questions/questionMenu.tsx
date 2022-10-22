import Menus from "@src/components/shared/menu";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import { useMenu } from "@src/utils/hooks";
// import UpdateModules from "./updateModules";
import { QuestionsInt } from "@src/utils/interface";

export default function CustomizedMenus({
  centreId,
  question,
}: {
  questionBankId: string;
  centreId: string;
  question: QuestionsInt;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          {/* <UpdateModules
            questionBankId={questionBankId}
            centreId={centreId}
            question={question}
          /> */}
          <Delete
            id={question?.id}
            centreId={centreId}
            questionBankId={question?.questionBankId}
          />
        </div>
      </Menus>
    </>
  );
}
