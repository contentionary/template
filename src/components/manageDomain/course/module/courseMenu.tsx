import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Visibility from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "../delete";
import AddModules from "./addModules";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
import { useDialog } from "@src/utils/hooks";
import { useState } from "react";
// import { request } from "@src/utils";

export default function CustomizedMenus({
  id,
  centreId,
  refetch,
  slug,
}: {
  id: string;
  centreId: string;
  refetch: Function;
  slug: string;
}) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [content, setContent] = useState(false);
  function callOpenDialog(content: boolean) {
    setContent(content);
    openDialog();
  }
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <MenuItem onClick={() => callOpenDialog(false)} disableRipple>
            <AddCircleOutlineOutlined />
            Add Modules
          </MenuItem>
          <MenuItem onClick={() => callOpenDialog(true)} disableRipple>
            <AddCircleOutlineOutlined />
            Add Content
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <Link passHref href={`/admin/course/${slug}/${id}/subscribers`}>
            <MenuItem disableRipple>
              <PeopleAltOutlined />
              Subscribers
            </MenuItem>
          </Link>
          <Link passHref href={`/courses/${slug}/${id}`}>
            <MenuItem disableRipple>
              <Visibility />
              View course
            </MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <Link passHref href={`/admin/course/update/${id}?type=COURSE`}>
            <MenuItem disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
          </Link>
          <Delete id={id} centreId={centreId} />
        </div>
      </Menus>
      <AddModules
        CourseId={id}
        centreId={centreId}
        index={1}
        refetch={refetch}
        content={content}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </>
  );
}
