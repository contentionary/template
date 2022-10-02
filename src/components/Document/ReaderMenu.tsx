//mui icons
import ShareIcon from "@mui/icons-material/ShareOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import PreviousPageIcons from "@mui/icons-material/ArrowBackOutlined";
import NextPageIcon from "@mui/icons-material/ArrowForwardOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutIcon from "@mui/icons-material/ZoomOutOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
//
import useContextMenu from "@src/hooks/useContextMenu";
import { MouseEventHandler } from "react";

interface Props {
  nextPage: MouseEventHandler<HTMLLIElement>;
  previousPage: MouseEventHandler<HTMLLIElement>;
  zoomIn: MouseEventHandler<HTMLLIElement>;
  zoomOut: MouseEventHandler<HTMLLIElement>;
  download?: MouseEventHandler<HTMLLIElement>;
  share: MouseEventHandler<HTMLLIElement>;
  closeBook: MouseEventHandler<HTMLLIElement>;
  allowDownload: boolean;
}

const Menu = ({
  nextPage,
  previousPage,
  zoomIn,
  zoomOut,
  download,
  share,
  closeBook,
  allowDownload,
}: Props) => {
  const { anchorPoint, show } = useContextMenu();

  if (show) {
    return (
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li onClick={nextPage} className="menuItem">
          <NextPageIcon fontSize="medium" className="menuIcon" />
          Next Page
        </li>
        <li onClick={previousPage} className="menuItem">
          <PreviousPageIcons fontSize="medium" className="menuIcon" />
          Previous Page
        </li>
        <li onClick={zoomIn} className="menuItem">
          <ZoomInIcon fontSize="medium" className="menuIcon" />
          Zoom In
        </li>
        <li onClick={zoomOut} className="menuItem">
          <ZoomOutIcon fontSize="medium" className="menuIcon" />
          Zoom out
        </li>
        <hr />
        {allowDownload && (
          <li onClick={download} className="menuItem">
            <DownloadIcon fontSize="medium" className="menuIcon" />
            Download
          </li>
        )}
        <li onClick={share} className="menuItem">
          <ShareIcon fontSize="medium" className="menuIcon" />
          Share
        </li>
        <li onClick={closeBook} className="menuItem">
          <CloseIcon fontSize="medium" className="menuIcon" />
          Close book
        </li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
