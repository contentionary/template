import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import grey from "@mui/material/colors/grey";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
//
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// app components
import ExamNav from "./ExamNav";
import ExamQuestion from "./ExamQuestion";
import FinishedExamCard from "../ExamFinished";
import ModalComponent from "@src/components/shared/modal";
// icons
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
//  hooks, utils, interface and styles
import { request } from "@src/utils";
import useGlobalStyle from "@src/styles";
import { ExamFunc } from "./interfaceType";
import { useTimer } from "@src/utils/hooks";
import { useQuery, useMutation } from "react-query";
import useFormControlStyle from "@src/styles/formControl";
import {
  ExamQuestionsInt,
  // QuestionInt,
  ErrorResponseInt,
  RequestResponseInt,
} from "@src/utils/interface";
import Proctoring from "./proctoring";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export interface TempAnswerInt {
  questionId: string;
  optionId?: number;
  answer?: string | boolean;
  optionIds?: Array<number>;
  min?: string | number;
  max?: string | number;
}

const StartExam: ExamFunc = (props) => {
  const theme = useTheme();
  const { exam /* auth */ } = props;
  const globalStyle = useGlobalStyle();
  const formControlStyle = useFormControlStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  // exam questions
  const [examQuestions, setExamQuestions] = React.useState<ExamQuestionsInt>();
  //exam timer
  const [timeOut, setTimeOut] = React.useState(false);
  const { pause, start, resume, isPaused, formatTime, timer } =
    useTimer(setTimeOut);
  const { seconds, minutes, hours } = formatTime(Number(timer));
  // current question and section
  const [section, setSection] = React.useState(0);
  const [question, setQuestion] = React.useState(0);
  // pinned questions
  const [pinnedQuestions, setPinnedQuestions] = React.useState<{
    [index: string]: number;
  }>({});
  // answered questions
  const [answers, setAnswers] = React.useState<Record<string, TempAnswerInt>>(
    {}
  );

  const router = useRouter();
  // submit exam
  const [submitAnsResponse, setSubmitAnsResponse] =
    React.useState<RequestResponseInt>();
  const [openEndExamModal, setOpenEndExamModal] =
    React.useState<boolean>(false);
  const [endingExam, setEndingExam] = React.useState<boolean>(false);
  // subscriber exam question
  const { isLoading, isError, data, error } = useQuery(
    ["examQuestions", { id: exam.id }],
    async () => {
      return await request.get({
        url: `/centre/${exam.centreId}/exam/${exam.id}/subscriber-questions`,
      });
    }
  ) as {
    isLoading: boolean;
    isError: boolean;
    data: RequestResponseInt;
    error: AxiosError;
  };

  // Submit Exam mutant
  const submitAnswer = useMutation(
    async () => {
      return await request.post({
        url: `/centre/${props.centerId}/exam/${props.exam.id}/answer`,
        data: {
          duration: !timer
            ? exam.duration * 60
            : exam.duration * 60 - timer / 1000,
          answers: answers,
        },
      });
    },
    {
      onSuccess: async (data) => {
        if (data.data.answerId && exam.hasProctor) {
          await request.patch({
            url: `/centre/${exam.centreId}/protor-content/${router.query.proctoredId}`,
            data: {
              examAnswerId: data.data.answerId,
            },
          });
        }
        setEndingExam(false);
        setOpenEndExamModal(false);
        setSubmitAnsResponse(data);
        // router.push(`/exams/${props.exam.slug}/finish`);
      },
      onError: () => {
        setEndingExam(false);
        alert("something went wrong");
      },
    }
  );

  // cache exam answers
  const cacheAnswer = useMutation(
    async () => {
      return await request.patch({
        url: `/centre/${props.centerId}/exam/${props.exam.id}/temp-answer/${examQuestions?.cache.id}`,
        data: { answers: answers },
      });
    },
    {
      onSuccess: () => {
        console.log("answer cached");
      },
      onError: () => {
        console.log("something went wrong");
      },
    }
  );

  // submit answer on interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      cacheAnswer.mutate();
    }, 120000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set examQuestions and cached answers
  React.useEffect(() => {
    const examQuestionData = data?.data as ExamQuestionsInt;
    if (isLoading === false && data) {
      const timeLeft =
        (new Date(examQuestionData?.cache?.endAt).getTime() - Date.now()) /
        1000 /
        60;
      const time = timeLeft > 0 ? timeLeft : props.exam.duration;
      start(time);
      setExamQuestions(examQuestionData);
      // setAnswers(examData.cache?.answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  // Submit Exam on timeOut

  React.useEffect(() => {
    if (timeOut) {
      setEndingExam(true);
      submitAnswer.mutate();
    }
    return () => {
      // second;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOut]);

  // toggle pin question
  const togglePinQuestion = () => {
    if (pinnedQuestions[`sq-${section}-${question}`] === undefined) {
      setPinnedQuestions((prevState) => ({
        ...prevState,
        [`sq-${section}-${question}`]: question,
      }));
    } else {
      setPinnedQuestions((prevState) => {
        const copy = { ...prevState };
        delete copy[`sq-${section}-${question}`];
        return copy;
      });
    }
  };

  // handle close Submit Exam modal
  const handleCloseEndExamModal = () => {
    if (endingExam) return;
    setOpenEndExamModal(false);
  };

  // Submit Exam
  const handleEndExam = () => {
    setEndingExam(true);
    submitAnswer.mutate();
  };
  // change section
  const handleChangeSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(0);
    setSection(Number((event.target as HTMLInputElement).value));
  };

  // set question and section
  const setQuestionAndSection = (question: number, section: number) => {
    setQuestion(question);
    setSection(section);
  };

  // set previous question event: React.MouseEvent<HTMLButtonElement>
  const prevQuestion = () => {
    if (section === 0 && question === 0) {
      return;
    } else {
      if (section > 0 && question === 0) {
        setSection(section - 1);
        setQuestion(0);
      } else {
        setQuestion(question - 1);
      }
    }
  };

  // set next question event: React.MouseEvent<HTMLButtonElement>
  const nextQuestion = () => {
    if (
      examQuestions &&
      section === examQuestions?.sections.length - 1 &&
      question === examQuestions?.sections[section].questions.length - 1
    ) {
      return;
    } else {
      if (
        examQuestions?.sections[section].questions &&
        question < examQuestions?.sections[section].questions.length - 1
      ) {
        setQuestion(question + 1);
      } else {
        setSection(section + 1);
        setQuestion(0);
      }
    }
  };

  if (isLoading) {
    return (
      <Box py={24} textAlign="center">
        <Typography paragraph>
          <CircularProgress color="inherit" size={80} />
        </Typography>
        <Typography paragraph>getting exams please wait</Typography>
      </Box>
    );
  }
  if (isError) {
    const { message } = error?.response?.data as ErrorResponseInt;
    return (
      <Box py={24} textAlign="center">
        <Typography variant="h1" mb={2}>
          ⚠ Error
        </Typography>
        <Typography paragraph fontSize={24}>
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      {submitAnsResponse?.success ? (
        <FinishedExamCard
          exam={props.exam}
          submitAnsResponse={submitAnsResponse}
        />
      ) : !timeOut ? (
        <Box
          pt={0}
          display="flex"
          component="main"
          minHeight="100vh"
          flexDirection="column"
        >
          <ExamNav
            exam={exam}
            hours={hours}
            pause={pause}
            resume={resume}
            seconds={seconds}
            timeOut={timeOut}
            answers={answers}
            minutes={minutes}
            isPaused={isPaused}
            centerId={props.centerId}
            currentSection={section}
            currentQuestion={question}
            examQuestions={examQuestions}
            pinnedQuestions={pinnedQuestions}
            togglePinQuestion={togglePinQuestion}
            setOpenEndExamModal={setOpenEndExamModal}
            setSubmitAnsResponse={setSubmitAnsResponse}
            setQuestionAndSection={setQuestionAndSection}
          />
          <Box
            flexGrow={1}
            component="section"
            sx={{ pt: 4, pb: 8, px: { md: 6 } }}
          >
            <Container
              maxWidth="xl"
              sx={{ display: "grid", placeItems: "center" }}
            >
              <Box
                maxWidth={exam.hasProctor ? 1020 : 820}
                width="100%"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {exam.hasProctor && (
                  <Box sx={{ mr: 3 }}>
                    <Proctoring
                      centreId={exam.centreId}
                      proctoredId={router.query.proctoredId as string}
                    />
                  </Box>
                )}
                <Box maxWidth={820} width="100%">
                  <Typography
                    mb={3}
                    variant="h5"
                    component="h1"
                    textAlign="center"
                  >
                    {exam.name}
                  </Typography>
                  <Box className={isMatch ? "" : globalStyle.paperShadowSm}>
                    <Box
                      maxWidth="86vw"
                      borderBottom={1}
                      borderColor="divider"
                      sx={{ overflowX: "scroll" }}
                      className={globalStyle.hiddenScrollbar}
                    >
                      <RadioGroup
                        row
                        sx={{
                          px: 3,
                          py: 1,
                          minWidth: 560,
                          flexShrink: 0,
                          flexWrap: "nowrap",
                        }}
                        value={section}
                        onChange={handleChangeSection}
                        name="exam-questions-section"
                        defaultValue="general_section"
                        aria-labelledby="exam category group"
                        className={`${globalStyle.hiddenScrollbar} ${formControlStyle.formControlGroup} nowrap`}
                      >
                        {examQuestions?.sections?.map((section, index) => (
                          <FormControlLabel
                            key={`${section.id}-section`}
                            value={index}
                            control={<Radio />}
                            label={section.name}
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                    <ExamQuestion
                      answers={answers}
                      setAnswers={setAnswers}
                      currentSection={section}
                      currentQuestion={question}
                      examQuestions={examQuestions}
                      pinnedQuestions={pinnedQuestions}
                      togglePinQuestion={togglePinQuestion}
                    />
                    <Box p={3}>
                      <Stack
                        mt={2}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography mb={0} paragraph>
                          {examQuestions
                            ? `Question mark: ${examQuestions?.sections[section].questions[question]?.mark}`
                            : ""}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button
                            disabled={section === 0 && question === 0}
                            variant="contained"
                            disableElevation
                            size="large"
                            onClick={prevQuestion}
                          >
                            Previous
                          </Button>
                          {(!examQuestions?.sections.length ||
                            section === examQuestions?.sections.length - 1) &&
                          (!examQuestions?.sections[section].questions.length ||
                            question ===
                              examQuestions?.sections[section].questions
                                .length -
                                1) ? (
                            <Button
                              size="large"
                              color="error"
                              disableElevation
                              variant="contained"
                              onClick={() => setOpenEndExamModal(true)}
                            >
                              Submit Exam
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              disableElevation
                              size="large"
                              onClick={nextQuestion}
                            >
                              Next
                            </Button>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box
          pt={0}
          display="flex"
          component="main"
          minHeight="100vh"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box flexShrink={0}>
            <Typography paragraph py={3} textAlign="center">
              <CircularProgress sx={{ color: grey[300] }} size={60} />
            </Typography>
            <Typography mb={0} variant="h4" textAlign="center">
              {Object.keys(answers).length}{" "}
              <Typography variant="caption"> out of </Typography>
              {props.exam.questionCount}
              <Typography variant="caption"> questions </Typography>
            </Typography>
            <Typography
              mb={1}
              variant="h5"
              textAlign="center"
              sx={{ color: grey[600] }}
            >
              answered
            </Typography>
          </Box>
        </Box>
      )}
      <ModalComponent
        open={openEndExamModal}
        handleClose={handleCloseEndExamModal}
      >
        <React.Fragment>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <IconButton
              color="inherit"
              aria-label="close"
              disabled={endingExam}
              sx={{ p: 0.5, ml: "auto" }}
              onClick={handleCloseEndExamModal}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          {endingExam ? (
            <Typography paragraph py={3} textAlign="center">
              <CircularProgress sx={{ color: grey[300] }} size={60} />
            </Typography>
          ) : (
            <React.Fragment>
              <Typography
                mb={0}
                variant="h1"
                component="p"
                textAlign="center"
                sx={{ color: grey[400] }}
              >
                <LiveHelpOutlinedIcon fontSize="inherit" color="inherit" />
              </Typography>
              <Typography mb={0} variant="h4" textAlign="center">
                {Object.keys(answers).length}{" "}
                <Typography variant="caption"> out of </Typography>
                {props.exam.questionCount}
                <Typography variant="caption"> questions </Typography>
              </Typography>
              <Typography
                mb={1}
                variant="h5"
                textAlign="center"
                sx={{ color: grey[600] }}
              >
                answered
              </Typography>
              <Typography mb={3} paragraph textAlign="center">
                Do you want to end your exam now?
              </Typography>
            </React.Fragment>
          )}

          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Button
              size="large"
              color="secondary"
              disableElevation
              variant="outlined"
              disabled={endingExam}
              onClick={handleCloseEndExamModal}
            >
              Cancel
            </Button>
            <Button
              size="large"
              color="error"
              disableElevation
              variant="contained"
              disabled={endingExam}
              onClick={handleEndExam}
            >
              Continue
            </Button>
          </Stack>
        </React.Fragment>
      </ModalComponent>
    </React.Fragment>
  );
};
export default StartExam;
