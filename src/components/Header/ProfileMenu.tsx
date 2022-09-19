import React from "react";
// next
import NextLink from "next/link";
// mui components
// import Box from "@mui/material/Box";
// import Menu from "@mui/material/Menu";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Link as MuiLink } from "@mui/material";
// mui icons
import Logout from "@mui/icons-material/Logout";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// styles and interface
import useMenuStyle from "@src/styles/menu";

interface ProfileMenuInt {
  title: string;
}

const ProfileMenu = ({ title }: ProfileMenuInt) => {
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

  /*  transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
 */
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <Button
          ref={anchorRef}
          color="secondary"
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ color: "secondary.light" }}
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "composition-menu" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{Array.from(title)[0]}</Avatar>
          &nbsp; &nbsp;
          {title}
        </Button>
      </Tooltip>
      <Popper
        open={open}
        transition
        disablePortal
        role={undefined}
        anchorEl={anchorRef.current}
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper elevation={0} className={menuStyle.menuPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <NextLink href="/" passHref>
                    <MenuItem component={MuiLink} onClick={handleClose}>
                      <ListItemIcon>
                        <BookOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      Publications
                    </MenuItem>
                  </NextLink>
                  <NextLink href="/" passHref>
                    <MenuItem component={MuiLink} onClick={handleClose}>
                      <ListItemIcon>
                        <PlayLessonOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      My Courses
                    </MenuItem>
                  </NextLink>
                  <NextLink href="/" passHref>
                    <MenuItem component={MuiLink} onClick={handleClose}>
                      <ListItemIcon>
                        <MenuBookOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      My Exams
                    </MenuItem>
                  </NextLink>
                  <Divider />
                  <NextLink href="/" passHref>
                    <MenuItem component={MuiLink} onClick={handleClose}>
                      <ListItemIcon>
                        <PersonOutlineOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      My Profile
                    </MenuItem>
                  </NextLink>
                  <NextLink href="/login" passHref>
                    <MenuItem
                      component={MuiLink}
                      color="primary.main"
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </NextLink>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default ProfileMenu;
