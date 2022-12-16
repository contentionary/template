import * as React from "react";
import SideNav from "./sideNav";
import AppBarWithSiseNav from "@src/components/shared/appbarWithsideNav";
import MobileAppBar from "./appBar";
import HeadPage from "../PageHead";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

export default function CentreDashboard({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <SideNav />;

  return (
    <>
      <HeadPage
        title="Admin"
        image={cachedData?.centre?.logo || pageData?.centre?.logo}
        description="Manage your domain here"
      />
      <AppBarWithSiseNav
        sxDrawer={{ borderRight: "none !important" }}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        mobileAppBar={<MobileAppBar handleDrawerToggle={handleDrawerToggle} />}
        sideNav={drawer}
      >
        {children}
      </AppBarWithSiseNav>
    </>
  );
}
