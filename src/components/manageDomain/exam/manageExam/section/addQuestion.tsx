import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import useForm from "@src/hooks/useForm";
import CheckBox from "@src/components/shared/checkInput";
import { queryClient, request } from "@src/utils";
import { ChangeEvent, useEffect, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { BasePageProps } from "@src/utils/interface";
import { useRouter } from "next/router";
import { String } from "aws-sdk/clients/cloudsearchdomain";

const AddQuestion = (): JSX.Element => {
  const router = useRouter();
  const { id: examId, sectionId } = router.query;
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [isLoading, setIsLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const { submit } = useForm(create);
  const questions = pageData.allQuestionList.questions;
  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<Record<string, any>>
  >([]);
  const pageCount = pageData.allQuestionList.pageCount as number;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  function getQuestions() {
    setQuestionLoading(true);

    const temp: any = {};
    pageData.selectedQuestionList.sections.forEach(({ questions }: any) => {
      setSelectedQuestions([...selectedQuestions, ...questions]);
      questions.forEach((question: any) => {
        temp[question.questionId] = true;
      });
    });
    setCheckedQuestions({ ...checkedQuestions, ...temp });
    setQuestionLoading(false);
  }

  useEffect(() => {
    router.isReady && getQuestions();
  }, []);

  function handleCheck(id: String) {
    if (checkedQuestions[id]) {
      const questionIndex = selectedQuestions.findIndex(
        (item) => item.questionId === id
      );
      selectedQuestions.splice(questionIndex, 1);
    } else {
      selectedQuestions.push({
        questionId: id,
      });
    }

    setCheckedQuestions({
      ...checkedQuestions,
      [id]: !checkedQuestions[id],
    });

    setSelectedQuestions([...selectedQuestions]);
  }

  async function create() {
    try {
      setIsLoading(true);
      const editedQuestions = selectedQuestions.filter(
        (selectedQuestion) => !Object.keys(selectedQuestion).includes("id")
      );
      const questions = sectionId
        ? { questions: editedQuestions, examSectionId: sectionId }
        : { questions: editedQuestions };
      const data = await request.post({
        url: `/centre/${cachedData.centre.id}/exam/${examId}/questions`,
        data: questions,
      });
      // toggleToast(data.message);
      setIsLoading(false);
    } catch (error) {
      // toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {questionLoading ? (
        <div>loading</div>
      ) : (
        <form onSubmit={(e) => submit(e)}>
          <Stack spacing={3} mt={3}>
            <>
              {questions?.length ? (
                <>
                  <Typography sx={{ textAlign: "right" }} component="div">
                    <CheckBox
                      label={<Typography>Check all</Typography>}
                      onChange={(e: any) => {
                        if (e.target.checked) {
                          questions?.map(({ id }) => {
                            selectedQuestions.push({
                              questionId: id,
                            });
                          });
                          setSelectedQuestions([...selectedQuestions]);
                        } else {
                          questions?.map(({ id }) => {
                            const questionIndex = selectedQuestions.findIndex(
                              (item) => item.questionId === id
                            );
                            selectedQuestions.splice(questionIndex, 1);
                          });
                          setSelectedQuestions([...selectedQuestions]);
                        }
                      }}
                    />
                  </Typography>
                  {questions?.map(({ question, id }, index: number) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                      key={`${index}-question`}
                    >
                      <Avatar sx={{ mr: 2 }}>{++index}</Avatar>

                      <CheckBox
                        label={
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: question.question,
                            }}
                          />
                        }
                        checked={Boolean(checkedQuestions[id])}
                        onChange={() => handleCheck(id)}
                      />
                      <input
                        onBlur={(e: ChangeEvent<any>) => {
                          selectedQuestions.map((item) =>
                            item.questionId === id
                              ? (item.mark = e.target.value)
                              : item
                          );
                          setSelectedQuestions([...selectedQuestions]);
                        }}
                        placeholder="Score"
                        style={{ width: 100 }}
                      />
                    </Box>
                  ))}
                </>
              ) : (
                <Empty />
              )}
            </>

            <Typography style={{ textAlign: "right", marginTop: 20 }}>
              <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                <>
                  Add Questions
                  {isLoading && <Loading size={15} />}
                </>
              </ButtonComponent>
            </Typography>
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
          </Stack>
        </form>
      )}
    </>
  );
};

export default AddQuestion;
