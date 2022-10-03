import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Image from "@src/components/shared/image";
import Button from "@src/components/shared/button";
import useGlobalStyle from "@src/styles";
import useStyles from "./styles";
import { useRouter } from "next/router";
import Loading from "@src/components/shared/loading";

interface Props {
  link: string;
  name: string;
  description: string;
  installPlugin?: Function;
  plugin?: string;
  status?: boolean;
  price?: number;
  isLoading?: boolean;
}

const Card = ({
  link,
  name,
  description,
  installPlugin,
  plugin,
  status,
  price,
  isLoading,
}: Props): JSX.Element => {
  const globalStyle = useGlobalStyle();
  const router = useRouter();
  const styles = useStyles();
  const { centreSlug, id } = router.query;

  return (
    <Stack>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 106 }}>
          <Image
            src="/images/centre/service.svg"
            alt="contentionary"
            height="100%"
            width={106}
          />
        </Box>

        <Box sx={{ width: 401 }} paddingLeft={2}>
          <Typography
            className={styles.pluginName}
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            className={styles.poweredBy}
          >
            By Contentionary (Free)
          </Typography>
          <Typography
            variant="body1"
            component="div"
            className={styles.pluginDescription}
          >
            {description}
          </Typography>

          <Button
            size="large"
            disableElevation
            variant="contained"
            className={globalStyle.bgGradient}
            onClick={() =>
              !installPlugin
                ? router.push(`/${centreSlug}/${id}/${link}`)
                : installPlugin(plugin, status, price)
            }
          >
            <>
              {installPlugin ? (status ? "Uninstall" : "Install") : "Open"}{" "}
              {isLoading && <Loading size="small" sx={{ color: "#ffffff" }} />}
            </>
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Card;
