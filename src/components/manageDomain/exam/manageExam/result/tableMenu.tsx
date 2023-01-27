import Menus from "@src/components/shared/menu";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import { useMenu } from "@src/utils/hooks";
import ParticipantScript from "./participantScript";
import SectionScores from "./sectionScore";

export default function TableMenu({
  examId,
  centreId,
  result,
  toggleToast,
}: {
  examId: string;
  centreId: string;
  result: any;
  toggleToast: Function;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();

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
            toggleToast={toggleToast}
          />
          <SectionScores result={result} />
        </div>
      </Menus>
    </>
  );
}
