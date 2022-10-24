import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import dynamic from "next/dynamic";

import { BasePageProps, QuestionInt, QuestionsInt } from "@src/utils/interface";
import { isServerSide, queryClient } from "@src/utils";
import { useRouter } from "next/router";
import Accordion from "@src/components/shared/accordion";
import { useState } from "react";
import Breadcrumbs from "@src/components/shared/breadcrumbs";

const QuestionsPage = () => {
  const styles = useStyles();
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { questions, questionBank } = pageData as {
    questions: QuestionsInt[];
    questionBank: {
      name: string;
      description: string;
    };
  };
  const { id: questionBankId } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./questionBankMenu"));
  const QuestionMenu = dynamic(() => import("./questionMenu"));
  const [expanded, setExpanded] = useState(0);
  const links = [
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/exam", name: "Exams" },
    { link: "/admin/question-bank", name: "Question bank" },
  ];

  const getQuestionTypeData = (question: QuestionInt) => {
    if (question.type === "objective" || question.type === "multichoice") {
      return (
        <>
          {question.options.map(({ value, isCorrect }, index) => (
            <Typography
              variant="body1"
              component="div"
              key={`${index}-option`}
              sx={{ mb: 3}}
              className={`${styles.optionStyle} ${
                isCorrect ? styles.selected : ""
              }`}
              dangerouslySetInnerHTML={{ __html: value }}
            />
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
    }
  };
  return (
    <Box mt={4}>
      <Breadcrumbs
        links={links}
        currentPage={{
          name: "Questions",
          link: !isServerSide ? window.location.href : "",
        }}
      />

      <Typography
        variant="h5"
        component="div"
        sx={{ mt: 4, textTransform: "uppercase", mb: 1 }}
      >
        {questionBank.name}
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        dangerouslySetInnerHTML={{ __html: questionBank.description }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: { xs: 5 },
          mb: 5,
        }}
      >
        <Menu id={questionBankId as string} centreId={cachedData.centre.id} />
      </Box>
      {questions.length ? (
        <Box>
          {questions?.map(({ question, solution }, index) => (
            <Stack direction="row" spacing={5} key={`${index}-module`} mb={4}>
            <Avatar>{++index}</Avatar>
              <Accordion
                sx={{ width: "100%" }}
                onClick={() => setExpanded(index)}
                title={
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: question.question,
                    }}
                    variant="h6"
                    component="div"
                  />
                }
                expanded={expanded === index}
              >
                <>
                  {getQuestionTypeData(question)}
                  {solution?.text && (
                    <>
                      <Typography
                        sx={{ textDecoration: "underline" }}
                        variant="h6"
                        component="div"
                      >
                        Solution
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        dangerouslySetInnerHTML={{ __html: solution.text }}
                      />
                    </>
                  )}
                  <Typography style={{ textAlign: "right" }}>
                    <QuestionMenu
                      questionBankId={questionBankId as string}
                      centreId={cachedData.centre.id}
                      question={questions[index]}
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
    </Box>
  );
};

export default QuestionsPage;
