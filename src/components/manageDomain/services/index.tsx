import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Card from "../plugins/card";
import useStyles from "../plugins/styles";
import Grid from "@mui/material/Grid";

import Stack from "@mui/system/Stack";
import { PluginsInt } from "@src/utils/interface";

interface Props {
  title: string;
  plugins: PluginsInt[];
}
const Services = ({ title, plugins }: Props): JSX.Element => {
  const styles = useStyles();
  const pluginsWithLink = plugins.filter((plugin) => plugin.active);
  return (
    <Box mt={3} id="service">
      <Stack spacing={4}>
        <Box sx={{ textAlign: "center" }} pt={2}>
          <Typography
            variant="h4"
            component="div"
            className={styles.serviceHeader}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={{ xs: 5, md: 3 }}>
            {pluginsWithLink.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index} mt={3}>
                <Card {...item} link={`admin/${item.name.toLowerCase()}`} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Services;
