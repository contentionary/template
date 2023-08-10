// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import LeagueListSection from "../LeagueListSection";
import MyLeaguesBreadcrumbs from "./MyLeaguesBreadcrumbs";
// interface
import { queryClient } from "@src/utils";
import { LeaguesPageFunc } from "../interfaceType";
import { BasePageProps } from "@src/utils/interface";

const LeaguesLayout: LeaguesPageFunc = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <MyLeaguesBreadcrumbs />
        <Typography mb={4} variant="h4" component="h2">
          My Leagues
        </Typography>
        <LeagueListSection pageData={pageData} />
      </Container>
    </Box>
  );
};

export default LeaguesLayout;
