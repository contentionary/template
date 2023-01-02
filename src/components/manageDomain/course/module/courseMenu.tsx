import Menus from "@src/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import Visibility from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import Delete from "../delete";
import AddModules from "./addModules";
import Link from "next/link";
import { useMenu } from "@src/utils/hooks";
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
  // const [slug, setSlug] = useState("");
  // async function getCourse() {
  //   try {
  //     const { data } = await request.get({
  //       url: `/centre/${centreId}/course/${id}`,
  //     });
  //   } catch (error) {}
  // }
  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <AddModules
            CourseId={id}
            centreId={centreId}
            index={1}
            refetch={refetch}
          />
          <AddModules
            CourseId={id}
            centreId={centreId}
            index={1}
            refetch={refetch}
            content={true}
          />
          <Divider sx={{ my: 0.5 }} />
          <Link passHref href={`/admin/course/${id}/update?type=COURSE`}>
            <MenuItem disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
          </Link>
          <Link passHref href={`/courses/${slug}/${id}`}>
            <MenuItem disableRipple>
              <Visibility />
              View course
            </MenuItem>
          </Link>
          <Delete id={id} centreId={centreId} refetch={refetch} />
        </div>
      </Menus>
    </>
  );
}
