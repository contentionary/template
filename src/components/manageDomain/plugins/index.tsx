import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/system/Stack";
import {
  certificate,
  course,
  exam,
  league,
  publication,
  result,
} from "../plugins/data";

import useStyles from "./styles";
import Card from "../plugins/card";

import { handleError, queryClient, request } from "@src/utils";
import { useRouter } from "next/router";
import { useDialog } from "@src/hooks";
import { useState } from "react";

import ConfirmDialog from "@src/components/shared/confirmationMoal";
import NextLink from "@src/components/shared/link/btnLink";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";
import { BasePageProps } from "@src/utils/interface";

const Pluggins = ({
  title,
  numberOfPluginsToShow,
  pluginPage,
}: {
  title: string;
  numberOfPluginsToShow: number;
  pluginPage?: boolean;
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [removePlugin, setRemovePlugin] = useState("");
  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const pagePros = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = pagePros.pageData.centre;
  const data = [
    { item: exam, status: centre?.plugins?.EXAM },
    { item: league, status: centre?.plugins?.LEAGUE },
    { item: course, status: centre?.plugins?.COURSE },
    { item: publication, status: centre?.plugins?.PUBLICATION },
    { item: result, status: centre?.plugins?.RESULT },
    { item: certificate, status: false },
  ];

  function updatePlugin(plugin: string, status: boolean) {
    if (plugin === "EXAM") {
      centre.plugins.EXAM = status;
    } else if (plugin === "LEAGUE") {
      centre.plugins.LEAGUE = status;
    } else if (plugin === "PUBLICATION") {
      centre.plugins.PUBLICATION = status;
    } else if (plugin === "COURSE") {
      centre.plugins.COURSE = status;
    } else if (plugin === "RESULT") {
      centre.plugins.RESULT = status;
    }

    pagePros.pageData.centre = centre;
    queryClient.setQueryData("pageProps", pagePros);
  }

  async function installPlugin(plugin: string, status: boolean, price: number) {
    try {
      if (status) {
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
          setIsLoading(true);
          const { message } = await request.post({
            url: `/centre/${centre.id}/plugin`,
            data: { plugin },
          });
          updatePlugin(plugin, true);
          toggleToast(message);
          setIsLoading(false);
        }
      }
    } catch (error) {
      const message = handleError(error).message;
      toggleToast(message);
    }
  }

  async function uninstallPlugin() {
    try {
      setIsLoading(true);
      const { message } = await request.delete(
        `/centre/${centre.id}/plugin/${removePlugin}`
      );
      updatePlugin(removePlugin, false);
      toggleToast(message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      const message = handleError(error).message;
      toggleToast(message);
    }
  }
  return (
    <Box mt={3} id="plugin">
      <Stack spacing={8}>
        <Box sx={{ textAlign: "center" }} mt={20}>
          <Typography
            variant="h5"
            component="div"
            style={{ fontSize: pluginPage ? 24 : 40 }}
            className={styles.serviceHeader}
          >
            {title}
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container spacing={{ xs: 5, md: 4, lg: 9 }}>
            {data.map(
              ({ item, status }, index) =>
                index < numberOfPluginsToShow && (
                  <Grid item xs={12} md={12} lg={4} key={index}>
                    <Card
                      {...item}
                      status={status}
                      installPlugin={installPlugin}
                      isLoading={isLoading}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </Box>
        {!pluginPage && (
          <Box sx={{ textAlign: "center" }} mt={3} paddingY={5}>
            <NextLink
              href={`/${centre?.slug}/${centre?.id}/plugins`}
              size="large"
              disableElevation
              variant="outlined"
              color="primary"
              sx={{
                textAlign: "center",
                width: { xs: "100%", sm: "auto" },
                display: { xs: "block", sm: "inline-block" },
              }}
            >
              View More
            </NextLink>
          </Box>
        )}
      </Stack>
      <ConfirmDialog
        isLoading={isLoading}
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
    </Box>
  );
};
export default Pluggins;
