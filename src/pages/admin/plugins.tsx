import { BasePageProps, CentreProps } from "@src/utils/interface";
import {
  copy,
  handleError,
  request,
  cache,
  getCentre,
  queryClient,
} from "@src/utils";
// import { UserInt } from "@src/utils/interface";
// import AllPlugins from "@src/components/manageDomain/plugins";
import SideNav from "@src/components/manageDomain/sideNav";
import AppBarWithSiseNav from "@src/components/shared/appbarWithsideNav";
import MobileAppBar from "@src/components/manageDomain/appBar";
import Image from "@src/components/shared/image";

import { useState } from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

const CentrePage = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toastMessage, toggleToast } = useToast();

  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = pageData.centre as CentreProps;

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
      <>
        <Box sx={{ display: "flex", alignItems: "center" }} marginY={3}>
          <Image
            src={centre.logo ? centre.logo : "/images/centre/centreIcon.svg"}
            alt="Contentionary logo"
            width={71}
            height={70}
            style={{ borderRadius: "50%" }}
          />
          <Box marginLeft={2}>
            <Typography variant="h5" component="p" style={{ fontSize: 19 }}>
              {centre.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                component="p"
                style={{ fontSize: 12, fontWeight: 400, marginRight: 5 }}
              >
                {centre.isPrivate ? "Private" : "Public"} Center Id:
                {centre.id}
              </Typography>

              <Image
                onClick={() => {
                  copy(centre.id);
                  toggleToast("Copied");
                }}
                src="/images/centre/copy.svg"
                alt="Contentionary logo"
                width={15}
                height={15}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Box>
        {/* <AllPlugins
          title="My Centre Pluggins"
          centre={centre}
          setCentre={setCentre}
          numberOfPluginsToShow={6}
          pluginPage={true}
        /> */}
        {toastMessage && (
          <Toast
            showToast={toggleToast}
            message={toastMessage}
            status={Boolean(toastMessage)}
          />
        )}
      </>
    </AppBarWithSiseNav>
  );
};
export async function getServerSideProps(context: any) {
  try {
    const { user, token } = cache.get(context);
    const centre = await getCentre(context);
    const { data }: any = await request.get({
      url: `/centre/${centre?.id}`,
      token,
    });
    return {
      props: {
        pageData: { centre: data.data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error).message } };
  }
}

export default CentrePage;
