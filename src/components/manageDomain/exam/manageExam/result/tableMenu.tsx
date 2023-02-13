import Menus from "@src/components/shared/menu";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import { useMenu } from "@src/utils/hooks";
import ParticipantScript from "./participantScript";
import SectionScores from "./sectionScore";
import ProctoredLog from "./proctoringLog";
interface Props {
  examId: string;
  centreId: string;
  examAnswerId: string;
  result: any;
  toggleToast: Function;
}
export default function TableMenu(props: Props) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVert />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <ParticipantScript {...props} />
          <SectionScores {...props} />
          <ProctoredLog {...props} />
        </div>
      </Menus>
    </>
  );
}
