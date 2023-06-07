import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import LeagueCard from "./leagueCard";
import Grid from "@mui/material/Grid";
import { BasePageProps, LeagueInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LeagueAdmin = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { leagues } = pageData.leagueLists as {
    leagues: LeagueInt[];
  };
  const { folderId } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./menu"));
  const Breadcrumbs = dynamic(
    () => import("@src/components/shared/breadcrumbs")
  );
  const pageCount = pageData.leagueLists.pageCount as number;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };
  const links = [
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/league", name: "Leagues" },
  ];

  return (
    <Box mt={2}>
      <Breadcrumbs
        links={folderId ? links : [{ link: "/admin", name: "Dashboard" }]}
        currentPage={
          folderId
            ? { name: "Folder", link: "/" }
            : { link: "/admin/leagues", name: "leagues" }
        }
      />
      <Box
        sx={{
          textAlign: "right",
          mb: 2,
        }}
      >
        <Menu folderId={folderId as string} centreId={cachedData.centre.id} />
      </Box>
      {leagues.length ? (
        <>
          <Grid
            container
            mb={{ xs: 1, md: 2, xl: 3 }}
            spacing={{ xs: 1, md: 2, xl: 3 }}
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          >
            {leagues?.map((league, index) => (
              <Grid key={`${index}-leagues-card`} item xs={1}>
                <LeagueCard league={league} />
              </Grid>
            ))}
          </Grid>{" "}
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
        </>
      ) : (
        <Empty
          href={
            folderId
              ? `/admin/league/create?type=LEAGUE&folderId=${folderId}`
              : "/admin/league/create?type=LEAGUES"
          }
          buttonText="Create League"
        />
      )}
    </Box>
  );
};

export default LeagueAdmin;
