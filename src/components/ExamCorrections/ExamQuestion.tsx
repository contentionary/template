import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// icons
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// app components
import {
  RangeQuestionSelector,
  BooleanQuestionSelector,
  ObjectiveQuestionSelector,
  MultichoiceQuestionSelector,
} from "./ExamQuestionForms";
import ImageComponent from "@src/components/shared/image";
// utils, interface and styles
import { QuestionsInt } from "./interfaceType";

interface QuestionFormInt {
  currentQuestion: number;
  examQuestions: Array<QuestionsInt>;
  answer: Record<string, any>;
}

const ExamQuestion = ({
  examQuestions,
  currentQuestion,
  answer,
}: QuestionFormInt): JSX.Element => {
  let questionType;
  if (!examQuestions) {
    return (
      <Box py={4} textAlign="center">
        <Typography variant="h2">
          <HelpCenterOutlinedIcon fontSize="inherit" />
        </Typography>
        <Typography paragraph>No questions in this section</Typography>
      </Box>
    );
  }
  questionType = examQuestions[currentQuestion].question.type;
  const solution = examQuestions[currentQuestion].solution;
  const examQuestionFormProps = {
    questionId: examQuestions[currentQuestion].questionId,
    question: examQuestions[currentQuestion].question,
    answer: answer[examQuestions[currentQuestion].questionId],
  };

  return (
    <Box p={3}>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" color="primary">
          Question {currentQuestion + 1} of {examQuestions.length}
        </Typography>
      </Stack>
      <Typography
        display="flex"
        fontWeight="light"
        variant="subtitle2"
        alignItems="center"
      >
        Question:
      </Typography>
      {examQuestions[currentQuestion].question?.image ? (
        <Box width="100%" maxHeight={300} position="relative" overflow="clip">
          <ImageComponent
            alt="yes we can"
            width="100%"
            height="100%"
            layout="fixed"
            objectFit="contain"
            objectPosition="left"
            src={examQuestions[currentQuestion]?.question?.image as string}
          />
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{ "& > :first-of-type": { marginTop: 0, paddingTop: 0 } }}
        dangerouslySetInnerHTML={{
          __html: examQuestions[currentQuestion].question.question,
        }}
      />

      <Box mt={3}>
        {questionType === "objective" ? (
          <ObjectiveQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "boolean" ? (
          <BooleanQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "multichoice" ? (
          <MultichoiceQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "range" ? (
          <RangeQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "theory" ? (
          <Typography py={3} variant="subtitle1" textAlign="center">
            <strong>Your Answer</strong>
            <div>{examQuestionFormProps.answer.answer}</div>
          </Typography>
        ) : (
          <Typography py={3} variant="h4" textAlign="center">
            component not available
          </Typography>
        )}
      </Box>
      {(solution?.text || solution?.image) && (
        <Typography>
          <Box
            dangerouslySetInnerHTML={{ __html: solution?.text }}
            sx={{ "& > :first-of-type": { marginTop: 0, paddingTop: 0 } }}
          />
          {solution?.image && (
            <Box
              width="100%"
              maxHeight={300}
              position="relative"
              overflow="clip"
            >
              <ImageComponent
                alt="yes we can"
                width="100%"
                height="100%"
                layout="fixed"
                objectFit="contain"
                objectPosition="left"
                src={solution?.image as string}
              />
            </Box>
          )}
        </Typography>
      )}
    </Box>
  );
};
export default ExamQuestion;
