// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import LeaguesMenu from "./LeaguesMenu";
import LeagueListSection from "./LeagueListSection";
import LeagueBreadcrumbs from "./LeagueBreadcrumbs";
// interface
import { queryClient } from "@src/utils";
import { LeaguesPageFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const LeaguesLayout: LeaguesPageFunc = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <LeagueBreadcrumbs pageData={pageData} />
        <Grid
          container
          spacing={2}
          columns={{ xs: 1, sm: 3, md: 5, lg: 7, xl: 6 }}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <LeaguesMenu pageData={pageData} />
          </Grid>
          <Grid item xs={1} sm={2} md={4} lg={6} xl={5}>
            <Typography mb={4} variant="h4" component="h2">
              {pageData?.leagueList?.folder?.name || "Explore Leagues"}
            </Typography>
            <LeagueListSection pageData={pageData} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LeaguesLayout;
