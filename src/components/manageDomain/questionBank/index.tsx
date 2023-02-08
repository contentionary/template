import Box from "@mui/material/Box";
import Card from "./card";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import { BasePageProps, QuestionBankInt } from "@src/utils/interface";
import { isServerSide, queryClient } from "@src/utils";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import Breadcrumbs from "@src/components/shared/breadcrumbs";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const QuestionBank = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { questionBanks } = pageData.questionBankLists as {
    questionBanks: QuestionBankInt[];
  };
  const { folderId, folderName } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./menu"));
  const pageCount = pageData.questionBankLists.pageCount as number;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };
  const links = [
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/exam", name: "Exams" },
  ];
  const allLinks = [
    ...links,
    { link: "/admin/question-bank", name: "Question bank" },
  ];
  return (
    <Box mt={4}>
      <Breadcrumbs
        links={folderId ? allLinks : links}
        currentPage={
          folderId
            ? { name: "Folder", link: isServerSide ? "" : window.location.href }
            : { link: "/admin/question-bank", name: "Question bank" }
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: { xs: 5 },
          mb: 5,
        }}
      >
        <Typography variant="h5" component="div">
          {folderName ? folderName : "Question Banks"}
        </Typography>
        <Menu
          folderId={folderId as string}
          questionBanks={questionBanks}
          centreId={cachedData.centre.id}
        />
      </Box>

      {questionBanks.length ? (
        <>
          <Grid
            container
            mb={{ xs: 1, md: 2, xl: 3 }}
            spacing={{ xs: 1, md: 2, xl: 3 }}
            columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
          >
            {questionBanks?.map((questionBank, index) => (
              <Grid key={`${index}-question-bank-card`} item xs={1}>
                <Card {...questionBank} />
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
        </>
      ) : (
        <Empty
          href={`/admin/question-bank/create?type=QUESTIONBANK&folderId=${folderId}`}
          buttonText="Add Question bank"
        />
      )}
    </Box>
  );
};

export default QuestionBank;
