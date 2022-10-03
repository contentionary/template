import Box from "@mui/material/Box";
import useStyles from "./styles";
import NextLink from "@src/components/shared/link/btnLink";
import PublicationCard from "./PublicationCard";
import { Grid } from "@mui/material";
import {
  BasePageProps,
  PublicationInt,
} from "@src/utils/interface";
import { queryClient } from "@src/utils";

const PublicationAdmin = () => {
  const styles = useStyles();

  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { publications } = pageData as {
    publications: PublicationInt[];
  };

  return (
    <Box>
      <Box className={styles.switchContainer}>
        <NextLink
          href="/admin/publication/create?type=FOLDER"
          disableElevation
          className={styles.createFolder}
        >
          Create Folder
        </NextLink>
        <NextLink
          href="/admin/publication/create?type=PUBLICATION"
          disableElevation
          className={styles.createPublication}
        >
          Create publication
        </NextLink>
      </Box>

      <Grid
        container
        mb={{ xs: 1, md: 2, xl: 3 }}
        spacing={{ xs: 1, md: 2, xl: 3 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
      >
        {publications?.map((publication, index) => (
          <Grid key={`${index}-publication-card`} item xs={1}>
            <PublicationCard {...publication} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PublicationAdmin;
