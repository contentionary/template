import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/system/Stack";

import useStyles from "./styles";
import Card from "../plugins/card";

import { handleError, isServerSide, queryClient, request } from "@src/utils";
import { useRouter } from "next/router";
import { useDialog } from "@src/hooks";
import { useState } from "react";
import { v4 as uuid } from "uuid";

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
  const verifyValue = router.query.verifyValue === "true";
  const { reference, price: deductedPrice } = router.query;
  const redirectUrl = !isServerSide ? window.location.href : "";
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
  const ConfirmPayment = dynamic(
    () => import("@src/components/payment/confirmPayment")
  );

  async function updatePlugins() {
    const { data } = await request.get({
      url: `/plugins?centreId=${centre.id}`,
    });
    setLatestPlugins([...(data as any)]);
    toggleToast("Successful");
    setInstalling(false);
  }

  async function installPlugin(
    plugin: string,
    active: boolean,
    price: number,
    id: string
  ) {
    try {
      setInstalling(true);
      if (active) {
        setRemovePlugin(plugin);
        openDialog();
      } else {
        router.push({
          pathname: "/payment",
          query: {
            currency: "NGN",
            purpose: "CENTRE_PLUGIN",
            redirectUrl: !isServerSide ? window.location.href : "",
            amount: price,
            metaData: `{ "centreId": "${centre.id}" }`,
            itemId: id,
            paymentMethod: "CARD",
            transactionkey: uuid(),
          },
        });
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
      {verifyValue && (
        <ConfirmPayment
          price={Number(deductedPrice)}
          reference={reference}
          redirectUrl={redirectUrl}
        />
      )}
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
