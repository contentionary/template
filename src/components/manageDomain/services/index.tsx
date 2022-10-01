import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Card from "../plugins/card";
import useGlobalStyle from "@src/styles";
import useStyles from "../plugins/styles";
import Grid from "@mui/material/Grid";

import NextLink from "@src/components/shared/link/btnLink";
import Stack from "@mui/system/Stack";
import {
  certificate,
  course,
  exam,
  league,
  publication,
  result,
} from "../plugins/data";
import { CentreProps } from "@src/pages/manage-domain/[centreId]";

interface Props {
  title: string;
  centre: CentreProps;
  numberOfPluginsToShow: number;
}
const Services = ({
  title,
  centre,
  numberOfPluginsToShow,
}: Props): JSX.Element => {
  const globalStyle = useGlobalStyle();
  const styles = useStyles();

  const data = [
    { item: exam, status: centre.plugins.EXAM },
    { item: league, status: centre.plugins.LEAGUE },
    { item: course, status: centre.plugins.COURSE },
    { item: publication, status: centre.plugins.PUBLICATION },
    { item: result, status: centre.plugins.RESULT },
    { item: certificate, status: false },
  ];

  return (
    <Box mt={3} id="service">
      <Stack spacing={8}>
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
          <Grid container spacing={{ xs: 5, md: 4, lg: 9 }}>
            {data.map(
              ({ item, status }, index) =>
                status &&
                index < numberOfPluginsToShow && (
                  <Grid item xs={12} md={12} lg={4} key={index}>
                    <Card {...item} />
                  </Grid>
                )
            )}
          </Grid>
        </Box>
        <Box sx={{ textAlign: "center" }} mt={3} paddingY={{ xs: 3, md: 5 }}>
          <NextLink
            href="/"
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
      </Stack>
    </Box>
  );
};

export default Services;
