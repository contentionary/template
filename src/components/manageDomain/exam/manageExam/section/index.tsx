import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import DeleteForever from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AddSection from "./addSection";
import { useQuery } from "react-query";
import { handleError, request } from "@src/utils";
import dynamic from "next/dynamic";
import Accordion from "@src/components/shared/accordion";
import { useState } from "react";
import SectionMenu from "./menu";
import { SectionInt } from "./interface";
import { useDialog } from "@src/hooks";
import AddQuestion from "./addQuestion";
import Delete from "./delete";

const fetchQuestion = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, examId] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/exam/${examId}/questions`,
  });
  return data.sections;
};
export default function CustomizedMenus({
  examId,
  centreId,
  toggleToast,
}: {
  examId: string;
  centreId: string;
  toggleToast: Function;
}) {
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [expanded, setExpanded] = useState(0);

  const { isLoading, data, error, refetch } = useQuery(
    ["questions", centreId, examId],
    fetchQuestion
  );
  if (isLoading) {
    return <div>loading.....</div>;
  } else if (data) {
    return (
      <Stack spacing={4}>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
        >
          Add Exam Questions
        </Typography>
        <Typography variant="body1" component="p">
          Assign questions from your question bank into your exam. If you don’t
          have a question bank or questions in your question bank, please go to
          the question bank tab in your centre and create a question bank or add
          questions to your question bank.
        </Typography>
        <Box>
          <AddSection
            centreId={centreId}
            examId={examId}
            toggleToast={toggleToast}
            refetch={refetch}
          />
        </Box>
        <Box>
          {data?.length ? (
            data?.map((section: SectionInt, index: number) => (
              <Accordion
                onClick={() => setExpanded(index)}
                key={`${index}-section`}
                title={
                  <Typography variant="h5" component="div">
                    {section.name}
                  </Typography>
                }
                expanded={expanded === index}
              >
                <>
                  <Typography>{section.description}</Typography>

                  <Typography component="div" sx={{ textAlign: "right" }}>
                    {section.name === "general" ? (
                      <AddQuestion
                        centreId={centreId}
                        examId={examId}
                        toggleToast={toggleToast}
                        refetch={refetch}
                      />
                    ) : (
                      <SectionMenu
                        centreId={centreId}
                        examId={examId}
                        section={section}
                        toggleToast={toggleToast}
                        refetch={refetch}
                      />
                    )}
                  </Typography>
                  {section.questions.length ? (
                    <>
                      <Typography variant="h5" component="div">
                        Questions
                      </Typography>
                      <Stack>
                        {section.questions.map(
                          ({ question, id }, questionIndex) => (
                            <Box
                              key={`${questionIndex}-question`}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar sx={{ mr: 2 }}>
                                  {++questionIndex}
                                </Avatar>
                                <Typography
                                  dangerouslySetInnerHTML={{
                                    __html: question.question,
                                  }}
                                />
                              </Box>

                              <Delete
                                closeDialog={closeDialog}
                                toggleToast={toggleToast}
                                isOpen={isOpen}
                                url={`/centre/${centreId}/exam/${examId}/exam-question/${id}`}
                              >
                                <IconButton onClick={() => openDialog()}>
                                  <DeleteForever htmlColor="red" />
                                </IconButton>
                              </Delete>
                            </Box>
                          )
                        )}
                      </Stack>
                    </>
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No Question Found.
                    </Typography>
                  )}
                </>
              </Accordion>
            ))
          ) : (
            <Empty />
          )}
        </Box>
      </Stack>
    );
  } else return <div>{handleError(error).message};</div>;
}
