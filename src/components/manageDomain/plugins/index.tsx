import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/system/Stack";

import useStyles from "./styles";
import Card from "../plugins/card";

import { handleError, queryClient, request } from "@src/utils";
import { useRouter } from "next/router";
import { useDialog } from "@src/hooks";
import { useState } from "react";

import { useToast } from "@src/utils/hooks";
import { BasePageProps, PluginsInt } from "@src/utils/interface";
import dynamic from "next/dynamic";

const Pluggins = ({
  title,
  plugins,
}: {
  title: string;
  plugins: PluginsInt[];
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [removePlugin, setRemovePlugin] = useState("");
  const { toastMessage, toggleToast } = useToast();
  const [installing, setInstalling] = useState(false);
  const [latestPlugins, setLatestPlugins] =
    useState<Array<PluginsInt>>(plugins);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = cachedData.centre;
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const ConfirmDialog: any = dynamic(
    () => import("@src/components/shared/confirmationModal")
  );
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );

  async function updatePlugins() {
    const { data } = await request.get({
      url: `/centre/${centre.id}/plugins`,
    });
    setLatestPlugins([...(data as any)]);
    toggleToast("Successful");
    setInstalling(false);
  }

  async function installPlugin(plugin: string, active: boolean, price: number) {
    try {
      setInstalling(true);
      if (active) {
        setRemovePlugin(plugin);
        openDialog();
      } else {
        if (price > 0) {
          router.push({
            pathname: "/payment",
            query: {
              currency: "NGN",
              purpose: "RESULT_PLUGIN",
              redirectUrl: "/admin",
              amount: price,
              itemId: centre.id,
            },
          });
        } else {
          await request.post({
            url: `/centre/${centre.id}/plugin`,
            data: { plugin },
          });
          updatePlugins();
        }
      }
    } catch (error) {
      const message = handleError(error).message;
      toggleToast(message);
      setInstalling(false);
    }
  }

  async function uninstallPlugin() {
    try {
      await request.delete(`/centre/${centre.id}/plugin/${removePlugin}`);
      updatePlugins();
      closeDialog();
    } catch (error) {
      const message = handleError(error).message;
      toggleToast(message);
      setInstalling(false);
    }
  }
  return (
    <Box mt={3} id="plugin">
      <Stack spacing={4}>
        <Box sx={{ textAlign: "center" }} mt={20}>
          <Typography
            variant="h5"
            component="div"
            className={styles.serviceHeader}
          >
            {title}
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container spacing={{ xs: 5, md: 2 }}>
            {latestPlugins.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} xl={3} key={index} mt={3}>
                <Card {...item} installPlugin={installPlugin} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
      <ConfirmDialog
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={uninstallPlugin}
        message="This action will automatically remove everything you have in ths plugin. Are you sure you want to uninstall this plugin?"
      />
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
      <Loading value={5} size={100} open={installing} />
    </Box>
  );
};
export default Pluggins;
