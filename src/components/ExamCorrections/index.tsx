import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as MuiLink } from "@mui/material";
// app components
import NextLink from "next/link";
import ExamQuestion from "./ExamQuestion";
//  hooks, utils, interface and styles
import useGlobalStyle from "@src/styles";
import { QuestionsInt } from "./interfaceType";
import { useRouter } from "next/router";

export interface TempAnswerInt {
  questionId: string;
  optionId?: number;
  answer?: Record<string, any>;
  optionIds?: Array<number>;
  min?: string | number;
  max?: string | number;
  questions: Array<QuestionsInt>;
}

const StartExam = ({
  pageData,
}: {
  pageData: Record<string, TempAnswerInt>;
}) => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  // exam questions
  const examQuestions = pageData.answers.questions;
  // current question and section
  const [question, setQuestion] = React.useState(0);

  // set previous question event: React.MouseEvent<HTMLButtonElement>
  const prevQuestion = () => {
    if (question === 0) {
      return;
    } else {
      setQuestion(question - 1);
    }
  };
  // set next question event: React.MouseEvent<HTMLButtonElement>
  const nextQuestion = () => {
    if (examQuestions && question === examQuestions.length - 1) {
      return;
    } else {
      if (examQuestions && question < examQuestions.length - 1) {
        setQuestion(question + 1);
      }
    }
  };
  return (
    <React.Fragment>
      <Box
        pt={0}
        display="flex"
        component="main"
        minHeight="100vh"
        flexDirection="column"
      >
        <Box
          flexGrow={1}
          component="section"
          sx={{ pt: 1, pb: 8, px: { md: 6 } }}
        >
          <Container
            maxWidth="xl"
            sx={{ display: "grid", placeItems: "center" }}
          >
            <Box maxWidth={820} width="100%" mt={10}>
              <div style={{ textAlign: "right" }}>
                <NextLink href={`/exams/${router.query.slug}`} passHref>
                  <Button
                    size="large"
                    disableElevation
                    variant="contained"
                    component={MuiLink}
                    sx={{ background: "red" }}
                  >
                    Exit Exam
                  </Button>
                </NextLink>
              </div>

              <Typography mb={3} variant="h5" component="h1" textAlign="center">
                Correction
              </Typography>
              <Box className={isMatch ? "" : globalStyle.paperShadowSm}>
                <ExamQuestion
                  currentQuestion={question}
                  examQuestions={examQuestions}
                  answer={pageData?.answers?.answer as Record<string, any>}
                />
                <Box p={3}>
                  <Stack
                    mt={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1}>
                      <Button
                        disabled={question === 0}
                        variant="contained"
                        disableElevation
                        size="large"
                        onClick={prevQuestion}
                      >
                        Previous
                      </Button>

                      <Button
                        disabled={question === examQuestions.length - 1}
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
    </React.Fragment>
  );
};
export default StartExam;
