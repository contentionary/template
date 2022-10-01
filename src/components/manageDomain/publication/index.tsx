import Box from "@mui/material/Box";
import useStyles from "./styles";
import CreatePublication from "./createPublication";
import { useContext, useState } from "react";
import { CentreContext } from "@src/pages/admin/publication";
import CreateFolder from "./createFolder";
import PublicationCard from "@src/components/shared/cards/PublicationCard";
import { Grid, IconButton } from "@mui/material";
import Delete from "./delete";
import UpdatePublication from "./update";

const PublicationAdmin = ({ publications }: { publications: any }) => {
  const [listOfPublication, setListOfPublication] = useState(
    publications.publications
  );
  const [centre] = useContext(CentreContext);
  const styles = useStyles();
  return (
    <Box>
      <Box className={styles.switchContainer}>
        <CreateFolder
          centreId={centre.id}
          listOfPublication={listOfPublication}
          setListOfPublication={setListOfPublication}
        />
        <CreatePublication centreId={centre.id} />
      </Box>

      <Grid
        container
        mb={{ xs: 1, md: 2, xl: 3 }}
        spacing={{ xs: 1, md: 2, xl: 3 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
      >
        {listOfPublication?.map((publication, index) => (
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
                index={index}
                centreId={centre.id}
                id={publication.id}
                publication={publication}
                setListOfPublication={setListOfPublication}
              />
              <Delete
                index={index}
                centreId={centre.id}
                id={publication.id}
                listOfPublication={listOfPublication}
                setListOfPublication={setListOfPublication}
              />
            </Box>
            <PublicationCard {...publication} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PublicationAdmin;
