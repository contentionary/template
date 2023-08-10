import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

interface Props {
  window?: () => Window;
  sideNav: JSX.Element;
  children: JSX.Element;
  mobileAppBar: JSX.Element;
  handleDrawerToggle: Function;
  mobileOpen: boolean;
  drawerWidth?: number;
  sxDrawer?: object;
  mainBodyStyle?: object;
}

export default function ResponsiveDrawer(props: Props): JSX.Element {
  const drawerWidth = props.drawerWidth || 266;
  drawerWidth;
  const { window } = props;

  const drawer = props.sideNav;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "white",
        }}
      >
        {props.mobileAppBar}
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={props.mobileOpen}
          onClose={() => props.handleDrawerToggle()}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              ...props.sxDrawer,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, lg: 6 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ...props.mainBodyStyle,
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
