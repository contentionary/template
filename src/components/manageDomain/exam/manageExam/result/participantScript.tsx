import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useRef, useState } from "react";
import { QuestionInt } from "@src/utils/interface";
import Accordion from "@src/components/shared/accordion";
import useStyles from "../../../questionBank/questions/styles";
import ReactToPrint from "react-to-print";
import Button from "@mui/material/Button";

const ParticipantScript = ({
  examId,
  centreId,
  result,
  toggleToast,
}: {
  examId: string;
  centreId: string;
  result: any;
  toggleToast: Function;
}): JSX.Element => {
  const styles = useStyles();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [expanded, setExpanded] = useState(0);
  const [sections, SetSections] = useState([]);
  const componentRef = useRef(null);

  async function getQuestions() {
    try {
      const { data } = await request.get({
        url: `/centre/${centreId}/exam/${examId}/questions?showAnswer=true`,
      });
      SetSections(data.sections);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  }
  const getQuestionTypeData = (question: QuestionInt, questionId: string) => {
    const answer = result.answers[questionId];

    if (question.type === "objective") {
      return (
        <>
          {question?.options?.map(({ value, isCorrect, id }, index) => (
            <Box
              key={`${index}-option`}
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className={`${styles.optionStyle} ${
                isCorrect ? styles.selected : ""
              }`}
            >
              <Typography
                variant="body1"
                component="div"
                key={`${index}-option`}
                sx={{ color: isCorrect ? "#fff" : "" }}
                dangerouslySetInnerHTML={{ __html: value }}
              />
              {id === answer?.optionId && <strong>Selected</strong>}
            </Box>
          ))}
        </>
      );
    } else if (question.type === "multichoice") {
      return (
        <>
          {question?.options?.map(({ value, isCorrect, id }, index) => (
            <Box
              key={`${index}-options`}
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className={`${styles.optionStyle} ${
                isCorrect ? styles.selected : ""
              }`}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ color: isCorrect ? "#fff" : "" }}
                key={`${index}-option`}
                dangerouslySetInnerHTML={{ __html: value }}
              />
              {answer?.optionIds.includes(id) && <strong>Selected</strong>}
            </Box>
          ))}
        </>
      );
    } else if (question.type === "boolean") {
      return (
        <>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 20px !important",
            }}
            variant="body1"
            component="div"
            className={`${styles.optionStyle} ${
              question.answer === true ? styles.selected : ""
            }`}
          >
            <span>True</span>
            <strong>{answer?.answer === true && "Selected"}</strong>
          </Typography>
          <Typography
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 20px !important",
            }}
            variant="body1"
            component="div"
            className={`${styles.optionStyle} ${
              question.answer === false ? styles.selected : ""
            }`}
          >
            <Typography>False</Typography>
            <Typography>{answer?.answer === false && "Selected"}</Typography>
          </Typography>
        </>
      );
    } else if (question.type === "theory") {
      return (
        <Stack spacing={2}>
          <Typography variant="h6">Participant Answer</Typography>
          <Typography variant="body1">{answer?.answer}</Typography>
        </Stack>
      );
    } else if (question.type === "range") {
      return (
        <Stack spacing={2}>
          <Typography variant="h6">Expected Answer</Typography>
          <Typography variant="body1">
            <strong>Min</strong>: {question.min}
          </Typography>
          <Typography variant="body1">
            <strong>Max</strong>:{question.max}
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="h6">Participant Answer</Typography>
          <Typography variant="body1">
            <strong>Min</strong>: {answer?.min}
          </Typography>
          <Typography variant="body1">
            <strong>Max</strong>:{answer?.max}
          </Typography>
        </Stack>
      );
    }
  };
  return (
    <>
      <MenuItem onClick={() => getQuestions()} sx={{ fontSize: 18 }}>
        <>
          <AddCircleOutlineOutlined /> &nbsp; Participant Script
        </>
      </MenuItem>

      <Dialog
        title="Participant script"
        isOpen={isOpen}
        closeDialog={closeDialog}
        width="xl"
        content={
          <>
            <div style={{ textAlign: "right" }}>
              <ReactToPrint
                trigger={() => (
                  <Button variant="contained">Print Result</Button>
                )}
                content={() => componentRef.current}
              />
            </div>
            <div ref={componentRef} style={{ marginTop: 20 }}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", textTransform: "uppercase" }}
              >
                {result.surname} {result.firstname}
              </Typography>
              {sections?.map(
                (
                  { questions, name }: { name: string; questions: [] },
                  index
                ) => (
                  <div key={`${index}-sections`}>
                    <Accordion
                      sx={{ mt: 4 }}
                      onClick={() => setExpanded(index)}
                      title={
                        <Typography variant="h5" component="div">
                          {name}
                        </Typography>
                      }
                      expanded={expanded === index}
                    >
                      <Box sx={{ width: "100%" }}>
                        {questions.map(
                          (
                            {
                              question,
                              questionId,
                            }: {
                              questionId: string;
                              question: QuestionInt;
                            },
                            questionIndex: number
                          ) => (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  alignItems: "center",
                                  mb: 5,
                                  mt: 5,
                                }}
                                key={`${questionIndex}-question`}
                              >
                                <Avatar>{++questionIndex}</Avatar>
                                <Box sx={{ width: "100%", ml: 2 }}>
                                  <Typography
                                    variant="h5"
                                    dangerouslySetInnerHTML={{
                                      __html: question.question,
                                    }}
                                  />
                                  {getQuestionTypeData(question, questionId)}
                                </Box>
                              </Box>
                              <Divider />
                            </>
                          )
                        )}
                      </Box>
                    </Accordion>
                  </div>
                )
              )}
            </div>
          </>
        }
      />
    </>
  );
};

export default ParticipantScript;
