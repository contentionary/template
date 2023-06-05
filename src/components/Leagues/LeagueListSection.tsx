import React from "react";
// next components
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
// app components
import Empty from "@src/components/shared/state/Empty";
import LeagueCard from "@src/components/shared/cards/LeagueCard";
// styles and interface
import { LeagueListInt } from "@src/utils/interface";

const LeagueListSection = ({ pageData }: Record<string, any>) => {
  const router = useRouter();
  const leagues = pageData.leagueList as LeagueListInt;
  const pageCount = pageData.leagueList.pageCount as number;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  if (!leagues) return <h1>....Loading</h1>;
  else if (leagues.leagues.length === 0) return <Empty />;
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 2, xl: 4 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      >
        {leagues.leagues.map((league, index) => (
          <Grid key={`${index}-league-card`} item xs={1}>
            <LeagueCard league={league} />
          </Grid>
        ))}
      </Grid>
      <Stack py={4} direction="row" justifyContent="center" spacing={2}>
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            onChange={handleChange}
            shape="rounded"
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default LeagueListSection;
