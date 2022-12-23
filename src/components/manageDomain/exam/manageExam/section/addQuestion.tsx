import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import Accordion from "@src/components/shared/accordion";
import useForm from "@src/hooks/useForm";
import CheckBox from "@src/components/shared/checkInput";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import TextFields from "@src/components/shared/input/textField";

interface Props {
  centreId: string;
  examId: string;
  sectionId?: string;
  toggleToast: Function;
  refetch: Function;
}

const AddQuestion = ({
  examId,
  centreId,
  sectionId,
  toggleToast,
  refetch,
}: Props): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const { submit } = useForm(create);
  const [expanded, setExpanded] = useState<number>();
  const [questionBanks, setQuestionBanks] = useState<Array<any>>();
  const [questions, setQuestions] = useState<Array<any>>();
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<Record<string, any>>
  >([]);
  const [pageCount, setPageCount] = useState(0);
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  async function getQuestionBanks() {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: `/centre/${centreId}/question-banks`,
      });
      setQuestionBanks(data.questionBanks);
      const { data: questions } = await request.get({
        url: `/centre/${centreId}/exam/${examId}/questions`,
      });
      questions.sections.map(({ questions }: any) => {
        setSelectedQuestions([...selectedQuestions, ...questions]);
      });
      setIsLoading(false);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  async function getQuestions(id: string, index: number, pageId: number) {
    try {
      setQuestionLoading(true);
      setExpanded(index);
      const { data } = await request.get({
        url: `/centre/${centreId}/question-bank/${id}/questions?pageId=${pageId}`,
      });
      setPageCount(data.pageCount);
      setQuestions(data.questions);
      setQuestionLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setQuestionLoading(false);
    }
  }
  async function create() {
    try {
      setIsLoading(true);
      const questions = sectionId
        ? { questions: selectedQuestions, examSectionId: sectionId }
        : { questions: selectedQuestions };
      const data = await request.post({
        url: `/centre/${centreId}/exam/${examId}/questions`,
        data: questions,
      });
      refetch();
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {sectionId ? (
        <MenuItem onClick={() => getQuestionBanks()} disableRipple>
          <>
            <AddCircleOutlineOutlined />
            &nbsp; Add Questions
          </>
        </MenuItem>
      ) : (
        <ButtonComponent onClick={() => getQuestionBanks()} disableRipple>
          <>
            <AddCircleOutlineOutlined />
            &nbsp; Add Questions
          </>
        </ButtonComponent>
      )}
      <Dialog
        title="Add Questions"
        isOpen={isOpen}
        closeDialog={closeDialog}
        width="lg"
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              {questionBanks?.length ? (
                questionBanks?.map(
                  (questionBank, questionBankIndex: number) => (
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
                        <Typography>Loading...</Typography>
                      ) : (
                        <>
                          {questions?.length ? (
                            <>
                              {questions?.map(
                                ({ question, id }, index: number) => (
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
                                        const hasQuestion =
                                          selectedQuestions.some(
                                            (item) => item.questionId === id
                                          );
                                        if (hasQuestion) {
                                          const questionIndex =
                                            selectedQuestions.findIndex(
                                              (item) => item.questionId === id
                                            );
                                          selectedQuestions.splice(
                                            questionIndex,
                                            1
                                          );
                                        } else {
                                          selectedQuestions.push({
                                            questionId: id,
                                          });
                                        }
                                        setSelectedQuestions([
                                          ...selectedQuestions,
                                        ]);
                                      }}
                                    />
                                    <TextFields
                                      onBlur={(e: ChangeEvent<any>) => {
                                        selectedQuestions.map((item) =>
                                          item.questionId === id
                                            ? (item.mark = e.target.value)
                                            : item
                                        );
                                        setSelectedQuestions([
                                          ...selectedQuestions,
                                        ]);
                                      }}
                                      label="Score"
                                      sx={{ width: 100 }}
                                    />
                                  </Box>
                                )
                              )}
                              <Stack
                                py={4}
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                              >
                                {pageCount > 1 && (
                                  <Pagination
                                    count={pageCount}
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
                  )
                )
              ) : (
                <Empty />
              )}
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Create
                    {isLoading && <Loading size={15} />}
                  </>
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => closeDialog()}
                  sx={{ fontSize: 18 }}
                >
                  Cancel
                </ButtonComponent>
              </Typography>
            </Stack>
          </form>
        }
      />
    </>
  );
};

export default AddQuestion;
