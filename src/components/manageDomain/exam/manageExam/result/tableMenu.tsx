import Menus from "@src/components/shared/menu";
import IconButton from "@mui/material/IconButton";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import MenuItem from "@mui/material/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useMenu } from "@src/utils/hooks";
import ParticipantScript from "./participantScript";
import SectionScores from "./sectionScore";
import Link from "next/link";
interface Props {
  examId: string;
  centreId: string;
  examAnswerId: string;
  result: any;
  toggleToast: Function;
  isPrivate: boolean;
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
          {props.isPrivate && (
            <Link
              passHref
              href={`/admin/exam/protor-content/${props.examAnswerId}?surname=${props?.result?.surname}&firstname=${props?.result?.firstname}`}
            >
              <MenuItem disableRipple>
                <CameraAltOutlined />
                Proctored log
              </MenuItem>
            </Link>
          )}
        </div>
      </Menus>
    </>
  );
}
