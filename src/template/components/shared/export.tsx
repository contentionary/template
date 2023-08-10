import Menus from "@src/template/components/shared/menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import FileDownloadDoneOutlined from "@mui/icons-material/FileDownloadDoneOutlined";
import Box from "@mui/material/Box";
import { useMenu } from "@src/utils/hooks/hooks";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { baseUrl, request } from "@src/utils";
import { useRouter } from "next/router";

export default function ExportMenu({ url }: { url: string }) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  const router = useRouter();

  const exportFile = async (format: string) => {
    try {
      const { data } = await request.get({
        url: "/request-export-code",
      });
      if (data.accessKey)
        router.push(
          `${baseUrl}/${url}/export?format=${format}&accessKey=${data.accessKey}`
        );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box sx={{ textAlign: "right" }}>
        <IconButton onClick={openMenu}>
          <MenuOutlined fontSize="large" color="primary" />
        </IconButton>
      </Box>

      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <MenuItem disableRipple onClick={() => exportFile("CSV")}>
            <FileDownloadDoneOutlined />
            Export CSV
          </MenuItem>
          <MenuItem disableRipple onClick={() => exportFile("PDF")}>
            <FileDownloadDoneOutlined />
            Export PDF
          </MenuItem>
        </div>
      </Menus>
    </>
  );
}
