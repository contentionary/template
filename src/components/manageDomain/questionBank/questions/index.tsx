import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import dynamic from "next/dynamic";

import { BasePageProps, QuestionInt, QuestionsInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import Accordion from "@src/components/shared/accordion";
import { useState } from "react";

const ModulesPage = () => {
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

  const getQuestionTypeData = (question: QuestionInt) => {
    if (question.type === "objective" || question.type === "multichoice") {
      return (
        <>
          {question.options.map(({ value, isCorrect }, index) => (
            <Typography
              variant="body1"
              component="div"
              key={`${index}-option`}
              sx={{ background: isCorrect ? "#000" : "" }}
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
            sx={{
              border: "solid 1px #dbdbdb",
              padding: 2,
              background: question.answer === true ? "red" : "",
            }}
          >
            True
          </Typography>
          <Typography
            variant="body1"
            sx={{
              border: "solid 1px #dbdbdb",
              padding: 2,
              background: question.answer === false ? "red" : "",
            }}
          >
            False
          </Typography>
        </>
      );
    }
  };
  return (
    <Box>
      <Typography
        onClick={() => router.back()}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
      </Typography>

      <Typography variant="h6" component="div">
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
                    dangerouslySetInnerHTML={{ __html: question.question }}
                    variant="h6"
                    component="div"
                  />
                }
                expanded={expanded === index}
              >
                <>
                  {getQuestionTypeData(question)}
                  {solution && (
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
                      index={index}
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

export default ModulesPage;
