import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
// icons
// utils, interface and styles
import { request } from "@src/utils";
import { useQuery, useMutation } from "react-query";
import useGlobalStyle from "@src/styles";
import { ExamFunc } from "./interfaceType";
import { ExamQuestionsInt } from "@src/utils/interface";
import useFormControlStyle from "@src/styles/formControl";

export interface TempAnswerInt {
  questionId: string;
  optionId?: number;
  answer?: string | boolean;
  optionIds?: Array<number>;
  min?: string;
  max?: string;
}

const StartExam: ExamFunc = (props) => {
  const theme = useTheme();
  const { exam /* auth */ } = props;
  const [examQuestions, setExamQuestions] = React.useState<ExamQuestionsInt>();
  const globalStyle = useGlobalStyle();
  const formControlStyle = useFormControlStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  //
  const [section, setSection] = React.useState(0);
  const [question, setQuestion] = React.useState(0);
  //
  const [answers, setAnswers] = React.useState<Record<string, TempAnswerInt>>(
    {}
  );

  // subscriber exam question
  const { isLoading, isError, data } = useQuery("examQuestions", async () => {
    return await request.get({
      url: `/exam/${exam.id}/subscriber-questions`,
    });
  });

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
    const examData = data?.data as ExamQuestionsInt;
    if (isLoading === false && data) {
      setExamQuestions(examData);
      // console.log(examData, exam);
      // setAnswers(examData.cache?.answers);
    }
  }, [isLoading, data]);

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
        ;<Typography paragraph>getting exams please wait</Typography>;
      </Box>
    );
  }
  if (isError) {
    return (
      <Box py={24} textAlign="center">
        <Typography variant="h1">⚠</Typography>
        <Typography paragraph>
          Something went wrong, please get an invigilator...
        </Typography>
      </Box>
    );
  }

  return (
    <Box pt={0} component="main" minHeight="100vh">
      <ExamNav
        exam={exam}
        answers={answers}
        centerId={props.centerId}
        currentSection={section}
        currentQuestion={question}
        examQuestions={examQuestions}
        setQuestionAndSection={setQuestionAndSection}
      />
      <Box component="section" sx={{ pt: 4, pb: 8, px: { md: 6 } }}>
        <Container maxWidth="xl" sx={{ display: "grid", placeItems: "center" }}>
          <Box maxWidth={620} width="100%">
            <Typography mb={3} variant="h5" component="h1" textAlign="center">
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
                      ? `Question mark: ${
                          examQuestions?.sections[section]?.questions[question]
                            ?.mark || 0
                        }`
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
                    <Button
                      disabled={
                        (!examQuestions?.sections.length ||
                          section === examQuestions?.sections.length - 1) &&
                        (!examQuestions?.sections[section].questions.length ||
                          question ===
                            examQuestions?.sections[section].questions.length -
                              1)
                      }
                      variant="contained"
                      disableElevation
                      size="large"
                      onClick={nextQuestion}
                    >
                      Next
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default StartExam;
