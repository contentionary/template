import MoreHoriz from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Delete from "./delete";
import Link from "next/link";
import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { useMenu } from "@src/utils/hooks";

export default function CustomizedMenus({
  centreId,
  id,
  questionBankId,
  refetch,
  centreSlug,
}: {
  questionBankId: string;
  centreId: string;
  id: string;
  refetch: Function;
  centreSlug: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <Link
            passHref
            href={`/${centreSlug}/admin/question-bank/${questionBankId}/question/${id}`}
          >
            <MenuItem disableRipple>
              <EditIcon />
              Edit Question Bank
            </MenuItem>
          </Link>
          <Delete
            id={id}
            centreId={centreId}
            questionBankId={questionBankId}
            refetch={refetch}
          />
        </div>
      </Menus>
    </>
  );
}
