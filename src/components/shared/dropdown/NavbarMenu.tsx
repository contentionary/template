import * as React from "react";
//
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
//
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
//
import useGlobalStyle from "@src/styles/index";
// interface
import { NavbarMenuFunc } from "./interfaceType";

//
const NavbarMenu: NavbarMenuFunc = ({ children, title, popupId }) => {
  const globalStyle = useGlobalStyle();
  const defaultPopupId = popupId ? popupId : "demo-popup-popover";

  return (
    <PopupState variant="popover" popupId={defaultPopupId}>
      {(popupState) => {
        const trigger = bindTrigger(popupState);
        return (
          <React.Fragment>
            <Button
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              {...trigger}
              onClick={(e: React.MouseEvent<any, MouseEvent>) => {
                e.stopPropagation();
                trigger.onClick(e);
              }}
              // onMouseOver={(e: React.MouseEvent<any, MouseEvent>) => {
              //   // e.stopPropagation();
              //   // trigger.onClick(e);
              // }}
              sx={{ color: "secondary.light" }}
            >
              {title} <ExpandMoreOutlinedIcon />
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              className={globalStyle.navbarMenuStyle}
            >
              {children}
            </Popover>
          </React.Fragment>
        );
      }}
    </PopupState>
  );
};

export default NavbarMenu;
