import Box from "@mui/material/Box";
import useStyles from "./styles";
import CreatePublication from "./createPublication";
import CreateFolder from "./createFolder";
import PublicationCard from "@src/components/shared/cards/PublicationCard";
import { Grid } from "@mui/material";
import Delete from "./delete";
import UpdatePublication from "./update";
import { CentreProps, PublicationInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";

const PublicationAdmin = () => {
  const styles = useStyles();

  const { centre, publications } = queryClient.getQueryData("pageProps") as {
    centre: CentreProps;
    publications: PublicationInt[];
  };

  return (
    <Box>
      <Box className={styles.switchContainer}>
        <CreateFolder centreId={centre.id} listOfPublication={publications} />
        <CreatePublication centreId={centre.id} />
      </Box>

      <Grid
        container
        mb={{ xs: 1, md: 2, xl: 3 }}
        spacing={{ xs: 1, md: 2, xl: 3 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
      >
        {publications?.map((publication, index) => (
          <Grid
            sx={{ position: "relative" }}
            key={`${index}-publication-card`}
            item
            xs={1}
          >
            <Box
              sx={{
                position: "absolute",
                background: "rgba(0, 0, 0, 0.1)",
                zIndex: 1,
                top: 3,
                // width: { md: "100%", lg: "90%" },
              }}
            >
              <UpdatePublication
                centreId={centre.id}
                publication={publication}
              />
              <Delete index={index} centreId={centre.id} id={publication.id} />
            </Box>
            <PublicationCard {...publication} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PublicationAdmin;
