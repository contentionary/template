import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// icons
import PushPinIcon from "@mui/icons-material/PushPinOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
// app components
import {
  RangeQuestionSelector,
  TheoryQuestionSelector,
  BooleanQuestionSelector,
  ObjectiveQuestionSelector,
  MultichoiceQuestionSelector,
} from "./ExamQuestionForms";

// utils, interface and styles
import useButtonStyle from "@src/styles/button";
import { ExamQuestionsInt } from "@src/utils/interface";

interface QuestionFormInt {
  currentSection: number;
  currentQuestion: number;
  examQuestions: ExamQuestionsInt;
}

const ExamQuestion = ({
  currentSection,
  currentQuestion,
  examQuestions,
}: QuestionFormInt): JSX.Element => {
  const buttonStyle = useButtonStyle();
  let questionType;

  if (!examQuestions.sections[currentSection].questions.length) {
    return (
      <Box py={4} textAlign="center">
        <Typography variant="h2">
          <HelpCenterOutlinedIcon fontSize="inherit" />
        </Typography>
        <Typography paragraph>No questions in this section</Typography>
      </Box>
    );
  }
  questionType =
    examQuestions.sections[currentSection].questions[currentQuestion].question
      .type;
  return (
    <Box p={3}>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" color="primary">
          Question {currentQuestion + 1} of{" "}
          {examQuestions.sections[currentSection].questions.length}
        </Typography>
        <Button
          size="large"
          color="secondary"
          className={`${buttonStyle.iconTextButton} row`}
        >
          <PushPinIcon fontSize="small" color="primary" />
          &nbsp; Pin this question
        </Button>
      </Stack>
      <Box
        dangerouslySetInnerHTML={{
          __html:
            examQuestions.sections[currentSection].questions[currentQuestion]
              .question.question,
        }}
      />
      <Box>
        {questionType === "objective" ? (
          <ObjectiveQuestionSelector
            question={
              examQuestions.sections[currentSection].questions[currentQuestion]
                .question
            }
          />
        ) : questionType === "boolean" ? (
          <BooleanQuestionSelector />
        ) : questionType === "theory" ? (
          <TheoryQuestionSelector />
        ) : questionType === "multichoice" ? (
          <MultichoiceQuestionSelector />
        ) : questionType === "range" ? (
          <RangeQuestionSelector />
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
