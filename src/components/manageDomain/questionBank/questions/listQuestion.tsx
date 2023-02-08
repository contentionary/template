import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";

import Accordion from "@src/components/shared/accordion";
import dynamic from "next/dynamic";

import { BasePageProps, QuestionInt, QuestionsInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import { useState } from "react";

const QuestionsPage = ({
  questions,
  handleChange,
}: {
  questions: QuestionsInt[];
  handleChange: Function;
}) => {
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const QuestionMenu = dynamic(() => import("./questionMenu"));
  const Image = dynamic(() => import("@src/components/shared/image"));
  const styles = useStyles();
  const router = useRouter();
  const { id: questionBankId, centreSlug } = router.query;
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;

  const pageCount = pageData.pageCount as number;

  const [expanded, setExpanded] = useState(0);

  const getQuestionTypeData = (question: QuestionInt) => {
    if (question.type === "objective" || question.type === "multichoice") {
      return (
        <>
          {question?.options?.map(({ value, isCorrect, image }, index) => (
            <Box
              key={`${index}-option`}
              sx={{
                mb: 3,
              }}
              className={`${
                isCorrect ? styles.selectedObj : styles.objOptionStyle
              }`}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ color: isCorrect ? "#fff" : "" }}
                dangerouslySetInnerHTML={{ __html: value }}
              />
              {image && (
                <Box sx={{ width: 500, mt: 3 }}>
                  <Image
                    src={image}
                    alt="question image"
                    height="100%"
                    width="100%"
                    layout="responsive"
                  />
                </Box>
              )}
            </Box>
          ))}
        </>
      );
    } else if (question.type === "boolean") {
      return (
        <>
          <Typography
            variant="body1"
            className={`${styles.optionStyle} ${
              question.answer === true ? styles.selected : ""
            }`}
          >
            True
          </Typography>
          <Typography
            sx={{ mt: 3 }}
            variant="body1"
            className={`${styles.optionStyle} ${
              question.answer === false ? styles.selected : ""
            }`}
          >
            False
          </Typography>
        </>
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
        </Stack>
      );
    }
  };

  return (
    <Box mt={4}>
      {questions.length ? (
        <Box>
          {questions?.map(({ question, solution }, questionIndex) => (
            <Stack
              direction="row"
              spacing={5}
              key={`${questionIndex}-module`}
              mb={4}
            >
              <Accordion
                sx={{ width: "100%" }}
                onClick={() => setExpanded(questionIndex)}
                title={
                  <div style={{ width: "100%" }}>
                    <Typography
                      component="div"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Avatar>{questionIndex + 1}</Avatar>
                    </Typography>

                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: question.question,
                      }}
                      variant="h5"
                      component="div"
                    />
                    {question.image && (
                      <Box sx={{ width: 500 }}>
                        <Image
                          src={question.image}
                          alt="question image"
                          height="100%"
                          width="100%"
                          layout="responsive"
                        />
                      </Box>
                    )}
                  </div>
                }
                expanded={expanded === questionIndex}
              >
                <>
                  {getQuestionTypeData(question)}
                  {(solution?.text || solution?.imageUrl) && (
                    <>
                      <Typography
                        sx={{ textDecoration: "underline" }}
                        variant="h6"
                        component="div"
                      >
                        Solution
                      </Typography>
                      {solution.text && (
                        <Typography
                          variant="body1"
                          component="div"
                          dangerouslySetInnerHTML={{ __html: solution.text }}
                        />
                      )}
                      {solution.imageUrl && (
                        <Box sx={{ width: 500 }}>
                          <Image
                            src={solution.imageUrl}
                            alt="question image"
                            height="100%"
                            width="100%"
                            layout="responsive"
                          />
                        </Box>
                      )}
                    </>
                  )}
                  <Typography style={{ textAlign: "right" }}>
                    <QuestionMenu
                      questionBankId={questionBankId as string}
                      centreId={cachedData.centre.id}
                      id={questions[questionIndex].id}
                      refetch={handleChange}
                      centreSlug={centreSlug as string}
                    />
                  </Typography>
                </>
              </Accordion>
            </Stack>
          ))}
        </Box>
      ) : (
        <Empty />
      )}
      <Stack py={4} direction="row" justifyContent="center" spacing={2}>
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            onChange={(e) => handleChange(e)}
            shape="rounded"
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default QuestionsPage;
