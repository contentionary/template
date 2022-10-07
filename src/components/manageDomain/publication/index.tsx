import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";

import useStyles from "./styles";
import NextLink from "@src/components/shared/link/btnLink";
import Link from "@src/components/shared/link";

import PublicationCard from "./PublicationCard";
import Grid from "@mui/material/Grid";
import { BasePageProps, PublicationInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Hidden from "@mui/material/Hidden";

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

  console.log(publications);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box sx={{ mt: { xs: 2, md: 5 } }} className={styles.switchContainer}>
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
        <Box
          sx={{
            display: { xs: "flex", md: "unset" },
            justifyContent: { xs: "center" },
            mt: { xs: 4, md: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ textAlign: "center", mr: 2 }}>
              <Link
                passHref
                href={`/admin/publication/${folderId}/update?type=FOLDER`}
                className={styles.createFolder}
              >
                <IconButton>
                  <EditOutlined />
                </IconButton>
              </Link>
              <Hidden lgDown>
                <Typography variant="caption" component="div">
                  Want to update Folder?
                </Typography>
              </Hidden>
            </Box>
            {!publications.length && (
              <Box sx={{ textAlign: "center" }}>
                <Delete centreId={cachedData.centre.id} id={folderId} />

                <Hidden lgDown>
                  <Typography variant="caption" component="div">
                    Want to delete Folder?
                  </Typography>
                </Hidden>
              </Box>
            )}
          </Box>
        </Box>
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
