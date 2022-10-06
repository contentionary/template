import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useStyles from "./styles";
import NextLink from "@src/components/shared/link/btnLink";
import PublicationCard from "./PublicationCard";
import Grid from "@mui/material/Grid";
import { BasePageProps, PublicationInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const PublicationAdmin = () => {
  const styles = useStyles();
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { publications } = pageData as {
    publications: PublicationInt[];
  };
  const { folderId } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Delete = dynamic(() => import("./delete"));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box className={styles.switchContainer}>
          <NextLink
            href={`/admin/publication/create?type=FOLDER&folderId=${folderId}`}
            disableElevation
            className={styles.createFolder}
          >
            Create Folder
          </NextLink>
          <NextLink
            href={`/admin/publication/create?type=PUBLICATION&folderId=${folderId}`}
            disableElevation
            className={styles.createPublication}
          >
            Create publication
          </NextLink>
        </Box>

        {!publications.length && (
          <Box sx={{ textAlign: "center" }}>
            <Delete centreId={cachedData.centre.id} id={folderId} />

            <Typography variant="caption" component="div">
              Want to delete Publication Folder?
            </Typography>
          </Box>
        )}
      </Box>

      {publications.length ? (
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
      ) : (
        <Empty
          href={`/admin/publication/create?type=PUBLICATION&folderId=${folderId}`}
          buttonText="Create publication"
        />
      )}
    </Box>
  );
};

export default PublicationAdmin;
