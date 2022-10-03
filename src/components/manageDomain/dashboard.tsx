import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";

import Card from "./card";
import Plugins from "./plugins";
import Services from "./services";
import useStyles from "./styles";

import Image from "@src/components/shared/image";
import Toast from "@src/components/shared/toast";
import Link from "@src/components/shared/link";
import { useToast } from "@src/utils/hooks";

import { copy } from "@src/utils";
import { BasePageProps, CentreProps } from "@src/utils/interface";
import { queryClient } from "@src/utils";

const Dashboard = (): JSX.Element => {
  const styles = useStyles();
  const { toastMessage, toggleToast } = useToast();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = pageData.centre as CentreProps;

  return (
    <Box mt={3}>
      <Box sx={{ display: "flex", alignItems: "center" }} marginBottom={3}>
        <Image
          src={centre?.logo ? centre?.logo : "/images/centre/centreIcon.svg"}
          alt="Contentionary logo"
          width={71}
          height={70}
          style={{ borderRadius: "50%" }}
        />
        <Box marginLeft={2}>
          <Typography variant="h5" component="p" className={styles.centrName}>
            {centre?.name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" component="p" className={styles.copyId}>
              {centre?.isPrivate ? "Private" : "Public"} Center Id: {centre?.id}
            </Typography>

            <Image
              onClick={() => {
                copy(centre?.id);
                toggleToast("Copied");
              }}
              src="/images/centre/copy.svg"
              alt="Contentionary logo"
              width={15}
              height={15}
              className={styles.pointer}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "centre" }} paddingY={4}>
        <Typography variant="h4" component="p" className={styles.welcomeNote}>
          Welcome
        </Typography>
        <LightModeOutlinedIcon color="primary" fontSize="large" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Link href={`/${centre?.slug}/${centre?.id}/subscribers`} passHref>
            <a>
              <Card src="/images/centre/person.svg" title="Subscribers" />
            </a>
          </Link>
        </Grid>
        <Grid item xs={6} md={3}>
          <Link
            href={`/wallet?centreSlug=${centre?.slug}&centreId=${centre?.id}`}
            passHref
          >
            <a>
              <Card src="/images/centre/wallet.svg" title="Centre Wallet" />
            </a>
          </Link>
        </Grid>
        <Grid item xs={6} md={3}>
          <Link href={`/${centre?.slug}/${centre?.id}/managers`} passHref>
            <a>
              <Card src="/images/centre/manager.svg" title="Managers" />
            </a>
          </Link>
        </Grid>
        <Grid item xs={6} md={3}>
          <Link href={`/${centre?.slug}/${centre?.id}/managers`} passHref>
            <a>
              <Card
                icon={<Diversity2OutlinedIcon htmlColor="#fff017" />}
                title="Group"
              />
            </a>
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 10 }}>
        {(centre?.plugins?.COURSE ||
          centre?.plugins?.LEAGUE ||
          centre?.plugins?.EXAM ||
          centre?.plugins?.PUBLICATION ||
          centre?.plugins?.RESULT) && (
          <Services
            centre={centre}
            title="My Centre Pluggins"
            numberOfPluginsToShow={6}
          />
        )}
      </Box>

      <Plugins
        title="Better your experience by installing more pluggins"
        numberOfPluginsToShow={6}
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toastMessage)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
};
export default Dashboard;
