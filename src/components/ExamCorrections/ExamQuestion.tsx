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
  TheoryQuestionSelector,
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
}

const ExamQuestion = ({
  examQuestions,
  currentQuestion,
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

  const examQuestionFormProps = {
    questionId: examQuestions[currentQuestion].questionId,
    question: examQuestions[currentQuestion].question,
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
            src={examQuestions[currentQuestion].question.image ?? ""}
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
        <Typography fontWeight="light" variant="subtitle2">
          Expected Answer:
        </Typography>
        {questionType === "objective" ? (
          <ObjectiveQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "boolean" ? (
          <BooleanQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "theory" ? (
          <TheoryQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "multichoice" ? (
          <MultichoiceQuestionSelector {...examQuestionFormProps} />
        ) : questionType === "range" ? (
          <RangeQuestionSelector {...examQuestionFormProps} />
        ) : (
          <Typography py={3} variant="h4" textAlign="center">
            component not available
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default ExamQuestion;
