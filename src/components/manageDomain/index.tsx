import * as React from "react";
import Dashboard from "./dashboard";
import SideNav from "./sideNav";
import AppBarWithSiseNav from "@src/components/shared/appbarWithsideNav";
import MobileAppBar from "./appBar";

export default function CentreDashboard({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <SideNav />;

  return (
    <AppBarWithSiseNav
      sxDrawer={{ borderRight: "none !important" }}
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      mobileAppBar={<MobileAppBar handleDrawerToggle={handleDrawerToggle} />}
      sideNav={drawer}
    >
      {children}
    </AppBarWithSiseNav>
  );
}
