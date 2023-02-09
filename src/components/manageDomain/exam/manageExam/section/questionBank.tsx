import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { queryClient } from "@src/utils";
import dynamic from "next/dynamic";
import { BasePageProps } from "@src/utils/interface";
import { useRouter } from "next/router";
import QuestionBankCard from "@src/components/manageDomain/questionBank/card";

const AddQuestion = (): JSX.Element => {
  const router = useRouter();
  const { id: examId, sectionId } = router.query;
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const questionBanks = pageData.questionBankList.questionBanks;

  const pageCount = pageData.questionBankList.pageCount as number;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  return (
    <Stack spacing={3} mt={3}>
      {questionBanks?.length ? (
        <>
          <Grid
            container
            mb={{ xs: 1, md: 2, xl: 3 }}
            spacing={{ xs: 1, md: 2, xl: 3 }}
            columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
          >
            {questionBanks?.map((questionBank, index) => (
              <Grid key={`${index}-question-bank-card`} item xs={1}>
                <QuestionBankCard
                  {...questionBank}
                  link={
                    questionBank.type === "FOLDER"
                      ? `/admin/exam/${examId}/question-bank/?folderId=${questionBank.id}`
                      : `/admin/exam/${examId}/question-bank/${questionBank.id}/addQuestions`
                  }
                />
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
        <Empty />
      )}
    </Stack>
  );
};

export default AddQuestion;
