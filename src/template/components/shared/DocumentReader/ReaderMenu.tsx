import React from "react";
// mui component
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
//mui icons
import ShareIcon from "@mui/icons-material/ShareOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutIcon from "@mui/icons-material/ZoomOutOutlined";
import NextPageIcon from "@mui/icons-material/ArrowForwardOutlined";
import PreviousPageIcons from "@mui/icons-material/ArrowBackOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
//
import useMenuStyle from "@src/template/styles/menu";
import { ReaderToolbarInt } from "./interfaceType";
import useContextMenu from "@src/utils/hooks/useContextMenu";

const Menu = ({
  share,
  scale,
  zoomIn,
  zoomOut,
  download,
  numPages,
  closeBook,
  nextPage,
  previousPage,
  allowDownload,
  pageNumber,
}: ReaderToolbarInt) => {
  const { anchorPoint, show } = useContextMenu();
  const menuStyle = useMenuStyle();

  if (show) {
    return (
      <Paper
        elevation={0}
        className={menuStyle.menuPaper}
        style={{
          top: anchorPoint.y,
          left: anchorPoint.x,
          position: "absolute",
        }}
      >
        <MenuList
          id="context-menu"
          autoFocusItem={show}
          aria-labelledby="context-button"
        >
          <MenuItem onClick={nextPage} disabled={pageNumber === numPages}>
            <ListItemIcon>
              <NextPageIcon fontSize="small" />
            </ListItemIcon>
            Next Page
          </MenuItem>
          <MenuItem onClick={previousPage} disabled={pageNumber <= 1}>
            <ListItemIcon>
              <PreviousPageIcons fontSize="medium" />
            </ListItemIcon>
            Previous Page
          </MenuItem>
          <MenuItem disabled={scale >= 3} onClick={zoomIn}>
            <ListItemIcon>
              <ZoomInIcon fontSize="medium" />
            </ListItemIcon>
            Zoom In
          </MenuItem>
          <MenuItem disabled={scale <= 0.2} onClick={zoomOut}>
            <ListItemIcon>
              <ZoomOutIcon fontSize="medium" />
            </ListItemIcon>
            Zoom out
          </MenuItem>
          <Divider />
          {Boolean(allowDownload) && (
            <MenuItem onClick={download}>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize="medium" />
              </ListItemIcon>
              Download
            </MenuItem>
          )}
          <MenuItem onClick={share}>
            <ListItemIcon>
              <ShareIcon fontSize="medium" />
            </ListItemIcon>
            Share
          </MenuItem>
          <MenuItem onClick={closeBook}>
            <ListItemIcon>
              <CloseIcon fontSize="medium" />
            </ListItemIcon>
            Close book
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
  return <></>;
};

export default Menu;
