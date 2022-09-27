import React, { Fragment } from "react";
// next
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
// app components
import PublicationCard from "@src/components/shared/cards/PublicationCard";
// styles and interface
import { LibraryPageFunc } from "./interfaceType";
import { BasePageProps, PublicationInt } from "@src/utils/interface";
import { queryClient } from "@src/pages";

const PublicationListSection: LibraryPageFunc = () => {
  const router = useRouter();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const publications = pageData.publicationData
    .publications as PublicationInt[];
  const pageCount = pageData.publicationData.pageCount as number;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  return (
    <Fragment>
      <Box>
        <Grid
          container
          mb={{ xs: 1, lg: 2, xl: 3 }}
          spacing={{ xs: 1, lg: 2, xl: 3 }}
          columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
        >
          {publications.map((publication, index) => (
            <Grid key={`${index}-publication-card`} item xs={1}>
              <PublicationCard {...publication} />
            </Grid>
          ))}
        </Grid>
        <Stack py={4} direction="row" justifyContent="center" spacing={2}>
          <Pagination
            size="large"
            shape="rounded"
            color="primary"
            count={pageCount}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Fragment>
  );
};

export default PublicationListSection;
