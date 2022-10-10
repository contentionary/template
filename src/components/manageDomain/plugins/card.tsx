import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Image from "@src/components/shared/image";
import Button from "@src/components/shared/button";
import useGlobalStyle from "@src/styles";
import useStyles from "./styles";
import { useRouter } from "next/router";

interface Props {
  link?: string;
  name: string;
  description?: string;
  installPlugin?: Function;
  active?: boolean;
  price?: number;
  imageUrl: string;
}

const Card = ({
  link,
  name,
  description,
  installPlugin,
  active,
  price,
  imageUrl,
}: Props): JSX.Element => {
  const globalStyle = useGlobalStyle();
  const router = useRouter();
  const styles = useStyles();

  return (
    <Stack>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 106 }}>
          <Image src={imageUrl} alt="contentionary" height="100%" width={106} />
        </Box>

        <Box paddingLeft={2}>
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
                ? router.push(`/${link}`)
                : installPlugin(name, active, price)
            }
          >
            {installPlugin ? (active ? "Uninstall" : "Install") : "Open"}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Card;
