import Menus from "@src/components/shared/menu";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import { useMenu } from "@src/utils/hooks";
import UpdateQuestion from "./addQuestion";
import { QuestionsInt } from "@src/utils/interface";

export default function CustomizedMenus({
  centreId,
  question,
  questionBankId,
  refetch,
}: {
  questionBankId: string;
  centreId: string;
  question: QuestionsInt;
  refetch: Function;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <UpdateQuestion
            questionBankId={questionBankId}
            centreId={centreId}
            question={question}
            update={true}
            refetch={refetch}
          />
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
