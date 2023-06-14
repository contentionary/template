import React from "react";
// next
import NextLink from "next/link";
// mui components
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Link as MuiLink } from "@mui/material";
// mui icons
import Logout from "@mui/icons-material/Logout";
import CourseIcon from "@mui/icons-material/TvOutlined";
// import { fontSize } from "@mui/joy/styles/styleFunctionSx";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
// styles and interface
import useMenuStyle from "@src/styles/menu";
import { UserInt, CachedCentreInt } from "@src/utils/interface";
// import { fontSize } from "@mui/joy/styles/styleFunctionSx";

interface ProfileMenuInt {
  cachedData: { user: UserInt; token: string; centre: CachedCentreInt };
}

const ProfileMenu = ({ cachedData }: ProfileMenuInt) => {
  const menuStyle = useMenuStyle();
  const { user } = cachedData;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

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
    <>
      <Tooltip title="Account settings">
        <Button
          ref={anchorRef}
          color="secondary"
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ color: "secondary.light", fontSize: 18 }}
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "composition-menu" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {Array.from(user?.firstname)[0]}
          </Avatar>
          &nbsp; &nbsp;
          {user?.firstname}
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
            <Paper elevation={0} className={`${menuStyle.menuPaper} caret`}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <NextLink href="/courses/my-courses" passHref>
                    <MenuItem
                      style={{ fontSize: 18 }}
                      component={MuiLink}
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <CourseIcon fontSize="small" />
                      </ListItemIcon>
                      My Course
                    </MenuItem>
                  </NextLink>
                  <NextLink href="/library/my-books" passHref>
                    <MenuItem
                      style={{ fontSize: 18 }}
                      component={MuiLink}
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <CourseIcon fontSize="small" />
                      </ListItemIcon>
                      My Books
                    </MenuItem>
                  </NextLink>
                  <NextLink href="/leagues/my-leagues" passHref>
                    <MenuItem
                      style={{ fontSize: 18 }}
                      component={MuiLink}
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <CourseIcon fontSize="small" />
                      </ListItemIcon>
                      My Leagues
                    </MenuItem>
                  </NextLink>
                  <NextLink href="/exams/my-exams" passHref>
                    <MenuItem
                      style={{ fontSize: 18 }}
                      component={MuiLink}
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <CourseIcon fontSize="small" />
                      </ListItemIcon>
                      My Exams
                    </MenuItem>
                  </NextLink>
                  {user.isAdmin && (
                    <NextLink href={"/admin"} passHref>
                      <MenuItem component={MuiLink} onClick={handleClose}>
                        <ListItemIcon>
                          <SettingsOutlined fontSize="small" />
                        </ListItemIcon>
                        Admin
                      </MenuItem>
                    </NextLink>
                  )}
                  <NextLink href="/logout" passHref>
                    <MenuItem
                      component={MuiLink}
                      color="primary.main"
                      onClick={handleClose}
                      style={{ fontSize: 18 }}
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
    </>
  );
};

export default ProfileMenu;
