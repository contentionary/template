import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// app components
import Dropdown from "@src/components/shared/dropdown";
// icons
import PushPinIcon from "@mui/icons-material/PushPinOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
// utils, interface and styles
import { TempAnswerInt } from ".";
import {
  ExamInt,
  ExamQuestionsInt,
  RequestResponseInt,
} from "@src/utils/interface";

import { PinnedQuestionsInt } from "./interfaceType";

interface ExamNavInt {
  centerId: string;
  exam: ExamInt;
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, TempAnswerInt>;
  examQuestions: ExamQuestionsInt | undefined;
  setSubmitAnsResponse: React.Dispatch<
    React.SetStateAction<RequestResponseInt | undefined>
  >;
  // eslint-disable-next-line no-unused-vars
  setQuestionAndSection: (question: number, section: number) => void;
}

interface ExamTimerInt {
  timeOut: boolean;
  pause: () => void;
  isPaused: boolean;
  resume: () => void;
  // eslint-disable-next-line no-unused-vars
  seconds: string;
  minutes: string;
  hours: string;
  // setOpenEndExamModal
  setOpenEndExamModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectQuestionDropdown = (props: ExamNavInt) => {
  return (
    <Dropdown
      title={
        <>
          Questions
          <ArrowDropDownOutlinedIcon />
        </>
      }
    >
      <Typography mb={0} textAlign="center" variant="h6">
        Go to Question Number
      </Typography>
      {props.examQuestions?.sections.map((section, sectionIndex) => (
        <Box key={`section-${section.id}`}>
          <Typography variant="h6">{section.name}</Typography>

          {section.questions.length ? (
            <Box
              mb={1}
              gap={1}
              display="grid"
              maxWidth={246}
              gridTemplateColumns="repeat(6, 1fr)"
            >
              {section.questions.map((question, questionIndex) => (
                <Button
                  onClick={() =>
                    props.setQuestionAndSection(questionIndex, sectionIndex)
                  }
                  size="small"
                  disableElevation
                  variant={
                    questionIndex === props.currentQuestion &&
                    sectionIndex === props.currentSection
                      ? "contained"
                      : "outlined"
                  }
                  sx={{
                    minWidth: 32,
                  }}
                  key={`question-button-${questionIndex}`}
                >
                  {questionIndex + 1}
                </Button>
              ))}
            </Box>
          ) : (
            <Typography py={1} paragraph textAlign="center">
              &middot; No questions in this section &middot;
            </Typography>
          )}
        </Box>
      ))}
    </Dropdown>
  );
};

const PinnedQuestionsDropdown = (props: ExamNavInt & PinnedQuestionsInt) => {
  return (
    <Dropdown
      title={
        <>
          <PushPinIcon fontSize="small" /> Pinned Questions
          <ArrowDropDownOutlinedIcon />
        </>
      }
    >
      <Typography
        mb={0}
        paragraph
        textAlign="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PushPinIcon fontSize="small" /> Go to Pinned Question
      </Typography>
      <Box
        p={1}
        gap={1}
        display="grid"
        maxWidth={246}
        gridTemplateColumns="repeat(1fr, 1fr)"
      >
        {Object.keys(props.pinnedQuestions).map((key, index) => (
          <Button
            size="small"
            disableElevation
            onClick={() =>
              props.setQuestionAndSection(
                Number(key.split("-")[2]),
                Number(key.split("-")[1])
              )
            }
            variant={
              Number(key.split("-")[2]) === props.currentQuestion &&
              Number(key.split("-")[1]) === props.currentSection
                ? "contained"
                : "outlined"
            }
            sx={{
              minWidth: 32,
            }}
            key={`pinned-question-button-${index}`}
          >
            section {Number(key.split("-")[1]) + 1}, question{" "}
            {Number(key.split("-")[2]) + 1}
          </Button>
        ))}
      </Box>
    </Dropdown>
  );
};

const ExamNav = (props: ExamNavInt & ExamTimerInt & PinnedQuestionsInt) => {
  // const router = useRouter();
  const theme = useTheme();
  return (
    <Fragment>
      <Box
        top={0}
        py={1}
        bgcolor="white"
        px={{ md: 6 }}
        component="nav"
        borderBottom={1}
        position="sticky"
        borderColor="divider"
        zIndex={theme.zIndex.drawer + 2}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            position="relative"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              display={{ xs: "none", md: "block" }}
            >
              <SelectQuestionDropdown {...props} />
            </Stack>
            <Box
              position="absolute"
              sx={{
                top: "50%",
                left: { xs: "0", md: "50%" },
                transform: {
                  xs: "translate(0, -50%)",
                  md: "translate(-50%, -50%)",
                },
              }}
            >
              <Typography
                py={2}
                variant="h5"
                width={200}
                display="flex"
                color="primary"
                alignItems="center"
                justifyContent={{ xs: "flex-start", md: "center" }}
              >
                <TimerOutlinedIcon color="secondary" />
                &nbsp;
                <Typography minWidth={140} variant="inherit" component="span">
                  {!props.timeOut ? (
                    <>
                      {props.hours} : {props.minutes} : {props.seconds}{" "}
                    </>
                  ) : (
                    <>00 : 00: 00</>
                  )}
                </Typography>
              </Typography>
            </Box>
            <Stack ml="auto" direction="row" alignItems="center" spacing={1}>
              <Box display={{ xs: "none", md: "block" }}>
                {props.exam.hasPin && <PinnedQuestionsDropdown {...props} />}
              </Box>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ mx: 1, display: { xs: "none", md: "block" } }}
              />
              <Button
                size="large"
                color="error"
                disableElevation
                variant="contained"
                onClick={() => props.setOpenEndExamModal(true)}
              >
                Submit Exam
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box
        py={1}
        px={{ md: 6 }}
        position="relative"
        zIndex={theme.zIndex.drawer + 1}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            display={{ xs: "flex", md: "none" }}
          >
            <SelectQuestionDropdown {...props} />
            {props.exam.hasPin && <PinnedQuestionsDropdown {...props} />}
          </Stack>
        </Container>
      </Box>
    </Fragment>
  );
};
export default ExamNav;
