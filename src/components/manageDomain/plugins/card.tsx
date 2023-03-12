import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Image from "@src/components/shared/image";
import Button from "@src/components/shared/button";
import useStyles from "./styles";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";

interface Props {
  link?: string;
  name: string;
  description?: string;
  installPlugin?: Function;
  active?: boolean;
  price?: number;
  imageUrl: string;
  id: string;
}

const PublicationCard = ({
  link,
  name,
  description,
  installPlugin,
  active,
  price,
  imageUrl,
  id,
}: Props): JSX.Element => {
  const router = useRouter();
  const styles = useStyles();

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack>
        <Box sx={{ display: "flex", flexDirection: { xs: "column" } }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Image src={imageUrl} alt="Edtify" height="100%" width={106} />
          </Box>
          <Box paddingLeft={1}>
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
              color="primary"
              className={styles.poweredBy}
            >
              By Edtify (Free)
            </Typography>
            <Typography
              variant="body1"
              component="div"
              className={styles.pluginDescription}
            >
              {description}
            </Typography>
          </Box>
        </Box>
        <Button
          size="large"
          disableElevation
          variant="contained"
          color="primary"
          onClick={() =>
            !installPlugin
              ? router.push(`/${link}`)
              : installPlugin(name, active, price, id)
          }
        >
          {installPlugin ? (active ? "Uninstall" : "Install") : "Open"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PublicationCard;
