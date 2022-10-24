import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
// app components
import Dropdown from "@src/components/shared/dropdown";
import ModalComponent from "@src/components/shared/modal";
import SnackbarComponent from "@src/components/shared/snackerBar/SnackbarComponent";
// icons
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PushPinIcon from "@mui/icons-material/PushPinOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
// utils, interface and styles
import { TempAnswerInt } from ".";
import { ExamQuestionsInt, ExamInt } from "@src/utils/interface";

interface ExamNavInt {
  exam: ExamInt;
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, TempAnswerInt>;
  examQuestions: ExamQuestionsInt | undefined;
  // eslint-disable-next-line no-unused-vars
  setQuestionAndSection: (question: number, section: number) => void;
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

const ExamNav = (props: ExamNavInt) => {
  const [openEndExamModal, setOpenEndExamModal] =
    React.useState<boolean>(false);

  const handleEndExam = () => {
    alert("end exam");
  };
  return (
    <Fragment>
      <Box
        top={0}
        py={1}
        bgcolor="white"
        zIndex={1000}
        px={{ md: 6 }}
        component="nav"
        borderBottom={1}
        position="sticky"
        borderColor="divider"
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
                00 : 45: 35
              </Typography>
            </Box>
            <Stack ml="auto" direction="row" alignItems="center" spacing={1}>
              <Box display={{ xs: "none", md: "block" }}>
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
                    gridTemplateColumns="repeat(6, 1fr)"
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <Button
                        size="small"
                        disableElevation
                        variant={index === 6 ? "contained" : "outlined"}
                        sx={{
                          minWidth: 32,
                        }}
                        key={`pinned-question-button-${index + 1}`}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </Box>
                </Dropdown>
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
                onClick={() => setOpenEndExamModal(true)}
              >
                End Exam
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box py={1} px={{ md: 6 }}>
        <Container maxWidth="xl">
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            display={{ xs: "flex", md: "none" }}
          >
            <SelectQuestionDropdown {...props} />
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
                gridTemplateColumns="repeat(6, 1fr)"
              >
                {Array.from({ length: 0 }).map((_, index) => (
                  <Button
                    size="small"
                    disableElevation
                    variant={index === 6 ? "contained" : "outlined"}
                    sx={{
                      minWidth: 32,
                    }}
                    key={`pinned-question-button-${index + 1}`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </Dropdown>
          </Stack>
        </Container>
      </Box>
      <ModalComponent
        open={openEndExamModal}
        handleClose={() => setOpenEndExamModal(false)}
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
              sx={{ p: 0.5, ml: "auto" }}
              onClick={() => setOpenEndExamModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography
            mb={0}
            variant="h1"
            component="p"
            textAlign="center"
            sx={{ color: grey[200] }}
          >
            <LiveHelpOutlinedIcon fontSize="inherit" color="inherit" />
          </Typography>
          <Typography mb={0} variant="h4" textAlign="center">
            {Object.keys(props.answers).length}{" "}
            <Typography variant="caption"> out of </Typography>
            {props.exam.questionCount}
            <Typography variant="caption"> answered </Typography>
          </Typography>
          <Typography mb={3} paragraph textAlign="center">
            Do you want to end your exam now?
          </Typography>
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
              onClick={() => setOpenEndExamModal(false)}
            >
              Cancel
            </Button>
            <Button
              size="large"
              color="error"
              disableElevation
              variant="contained"
              onClick={handleEndExam}
            >
              Continue
            </Button>
          </Stack>
        </React.Fragment>
      </ModalComponent>
    </Fragment>
  );
};
export default ExamNav;
