import React from "react";
// mui components
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// styles and interface
import useMenuStyle from "@src/styles/menu";

import { DropdownMenuInt } from "./interfaceType";

const DropdownMenu = (props: DropdownMenuInt) => {
  const menuStyle = useMenuStyle();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        color="secondary"
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ color: "secondary.light", fontSize: 18 }}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "composition-menu" : undefined}
      >
        {props.title}
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        role={undefined}
        anchorEl={anchorRef.current}
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper elevation={0} className={`${menuStyle.menuPaper} caret`}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {props.children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default DropdownMenu;
