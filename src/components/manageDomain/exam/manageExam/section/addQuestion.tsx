import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Accordion from "@src/components/shared/accordion";
import useForm from "@src/hooks/useForm";
import CheckBox from "@src/components/shared/checkInput";
import {  queryClient, request } from "@src/utils";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import TextFields from "@src/components/shared/input/textField";
import { BasePageProps } from "@src/utils/interface";
import { useRouter } from "next/router";

const AddQuestion = (): JSX.Element => {
  const router = useRouter();
  const { id: examId, sectionId } = router.query;
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [isLoading, setIsLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const { submit } = useForm(create);
  const [expanded, setExpanded] = useState<number>();
  const questionBanks = pageData.questionBankList.questionBanks;

  const [questions, setQuestions] = useState<Array<any>>();
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<Record<string, any>>
  >([]);
  const [questionPageCount, setquestionPageCount] = useState(1);
  const pageCount = pageData.questionBankList.pageCount as number;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  // async function getQuestionBanks() {
  //   try {
  //     openDialog();
  //     setIsLoading(true);
  //     const { data } = await request.get({
  //       url: `/centre/${centreId}/question-banks`,
  //     });
  //     setQuestionBanks(data.questionBanks);
  //     const { data: questions } = await request.get({
  //       url: `/centre/${centreId}/exam/${examId}/questions`,
  //     });
  //     questions.sections.map(({ questions }: any) => {
  //       setSelectedQuestions([...selectedQuestions, ...questions]);
  //     });
  //     setIsLoading(false);
  //     // openDialog();
  //   } catch (error) {
  //     toggleToast(handleError(error).message);
  //     setIsLoading(false);
  //   }
  // }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  async function getQuestions(id: string, index: number, pageId: number) {
    try {
      setQuestionLoading(true);
      setExpanded(index);
      const { data } = await request.get({
        url: `/centre/${cachedData.centre.id}/question-bank/${id}/questions?pageId=${pageId}`,
      });
      setquestionPageCount(data.pageCount);
      setQuestions(data.questions);
      setQuestionLoading(false);
    } catch (error) {
      console.log(error);
      // toggleToast(handleError(error).message);
      setQuestionLoading(false);
    }
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
    <Container>
      <form onSubmit={(e) => submit(e)}>
        <Stack spacing={3} mt={3}>
          {isLoading ? (
            <Typography
              component="div"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Typography component="div">
                <Loading />
              </Typography>
            </Typography>
          ) : questionBanks?.length ? (
            <>
              {questionBanks?.map((questionBank, questionBankIndex: number) => (
                <Accordion
                  onClick={() =>
                    getQuestions(questionBank.id, questionBankIndex, 1)
                  }
                  key={`${questionBankIndex}-questionBank`}
                  title={
                    <Typography variant="h6" component="div">
                      {questionBank.name}
                    </Typography>
                  }
                  expanded={expanded === questionBankIndex}
                >
                  {questionLoading ? (
                    <Typography
                      component="div"
                      sx={{
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                      }}
                    >
                      <Typography>
                        <Loading />
                      </Typography>
                    </Typography>
                  ) : (
                    <>
                      {questions?.length ? (
                        <>
                          <Typography
                            sx={{ textAlign: "right" }}
                            component="div"
                          >
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
                                    const questionIndex =
                                      selectedQuestions.findIndex(
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
                                checked={selectedQuestions.some(
                                  (item) => item.questionId === id
                                )}
                                onChange={() => {
                                  const hasQuestion = selectedQuestions.some(
                                    (item) => item.questionId === id
                                  );
                                  if (hasQuestion) {
                                    const questionIndex =
                                      selectedQuestions.findIndex(
                                        (item) => item.questionId === id
                                      );
                                    selectedQuestions.splice(questionIndex, 1);
                                  } else {
                                    selectedQuestions.push({
                                      questionId: id,
                                    });
                                  }
                                  setSelectedQuestions([...selectedQuestions]);
                                }}
                              />
                              <TextFields
                                onBlur={(e: ChangeEvent<any>) => {
                                  selectedQuestions.map((item) =>
                                    item.questionId === id
                                      ? (item.mark = e.target.value)
                                      : item
                                  );
                                  setSelectedQuestions([...selectedQuestions]);
                                }}
                                label="Score"
                                sx={{ width: 100 }}
                              />
                            </Box>
                          ))}
                          <Stack
                            py={4}
                            direction="row"
                            justifyContent="center"
                            spacing={2}
                          >
                            {questionPageCount > 1 && (
                              <Pagination
                                count={questionPageCount}
                                onChange={(e, value) =>
                                  getQuestions(
                                    questionBank.id,
                                    questionBankIndex,
                                    value as number
                                  )
                                }
                                shape="rounded"
                                size="large"
                              />
                            )}
                          </Stack>
                        </>
                      ) : (
                        <Empty />
                      )}
                    </>
                  )}
                </Accordion>
              ))}
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Add Questions
                    {isLoading && <Loading size={15} />}
                  </>
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => closeDialog()}
                  sx={{ fontSize: 18, color: "red" }}
                >
                  Cancel
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
            </>
          ) : (
            <Empty />
          )}
        </Stack>
      </form>
    </Container>
  );
};

export default AddQuestion;
