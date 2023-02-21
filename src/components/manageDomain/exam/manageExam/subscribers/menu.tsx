import Menus from "@src/components/shared/menu";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useMenu } from "@src/utils/hooks";
import AddSubscriber from "./addSubscriber";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
interface Props {
  // examId: string;
  // centreId: string;
  refetch: any;
  toggleToast: Function;
}
export default function SubscriberMenu(props: Props) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();

  return (
    <>
      <Box sx={{ textAlign: "right" }}>
        <IconButton onClick={openMenu}>
          <MenuOutlined fontSize="large" color="primary" />
        </IconButton>
      </Box>

      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <AddSubscriber {...props} />
        </div>
      </Menus>
    </>
  );
}
