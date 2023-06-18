import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import LeagueExamCard from "./leagueExamCard";
import Grid from "@mui/material/Grid";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import AddExam from "./addExam";
import { useToast } from "@src/utils/hooks";

const LeagueAdmin = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const leagueExams = pageData.leagueExamLists as ExamInt[];
  const { id: leagueId, folderId } = router.query;
  const { toastMessage, toggleToast } = useToast();
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const LeagueMenu = dynamic(() => import("./leagueMenu"));
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Breadcrumbs = dynamic(
    () => import("@src/components/shared/breadcrumbs")
  );
  const pageCount = pageData.leagueExamLists.pageCount as number;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };
  const links = [
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/league", name: "Leagues" },
    { link: `/admin/league?folderId=${folderId}`, name: "Folder" },
  ];

  return (
    <Box mt={2}>
      <Breadcrumbs
        links={
          folderId
            ? links
            : [
                { link: "/admin", name: "Dashboard" },
                { link: "/admin/league", name: "Leagues" },
              ]
        }
        currentPage={
          folderId
            ? { name: "League exams", link: "/League exams" }
            : { link: "", name: "League exams" }
        }
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <AddExam
          toggleToast={toggleToast}
          leagueId={leagueId as string}
          refetch={handleChange}
        />
        <LeagueMenu centreId={cachedData.centre.id} id={leagueId as string} />
      </Box>
      {leagueExams?.length ? (
        <>
          <Grid
            container
            mb={{ xs: 1, md: 2, xl: 3 }}
            spacing={{ xs: 1, md: 2, xl: 3 }}
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          >
            {leagueExams?.map((exam, index) => (
              <Grid key={`${index}-leagues-card`} item xs={1}>
                <LeagueExamCard
                  exam={exam}
                  leagueId={leagueId as string}
                  handleChange={handleChange}
                  toggleToast={toggleToast}
                  centreId={cachedData.centre.id}
                />
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
        <Empty />
      )}
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
};

export default LeagueAdmin;
