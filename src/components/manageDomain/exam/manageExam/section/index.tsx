import Typography from "@mui/material/Typography";
// import MoreHoriz from "@mui/icons-material/MoreHoriz";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import Delete from "../delete";
import { useToast } from "@src/utils/hooks";
import { CourseContentInt } from "@src/utils/interface";
import AddSection from "./addSection";
import { useQuery } from "react-query";
import { handleError, request } from "@src/utils";
import dynamic from "next/dynamic";
import Accordion from "@src/components/shared/accordion";
import { useState } from "react";
import SectionMenu from "./menu";

export default function CustomizedMenus({
  examId,
  centreId,
}: {
  examId: string;
  centreId: string;
  module?: CourseContentInt;
  index?: number;
}) {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const { toastMessage, toggleToast } = useToast();
  const [expanded, setExpanded] = useState(0);

  const { isLoading, error, data } = useQuery(
    "sections",
    async () =>
      await request.get({
        url: `/centre/${centreId}/exam/${examId}/questions`,
      })
  );
  if (isLoading) {
    return <div>loading.....</div>;
  } else if (data) {
    return (
      <Box>
        <Typography>
          Assign questions from your question bank into your exam. If you don’t
          have a question bank or questions in your question bank, please go to
          the question bank tab in your centre and create a question bank or add
          questions to your question bank.
        </Typography>
        <Box>
          <AddSection centreId={centreId} examId={examId} />
        </Box>
        <Box>
          {data?.data?.sections?.length ? (
            data?.data?.sections?.map((section: any, index: number) => (
              <Accordion
                onClick={() => setExpanded(index)}
                key={`${index}-module`}
                title={
                  <Typography variant="h6" component="div">
                    {section.name}
                  </Typography>
                }
                expanded={expanded === index}
              >
                <>
                  <Typography>{section.description}</Typography>
                  <Typography component="div">
                    <SectionMenu centreId={centreId} id={examId} />
                  </Typography>
                </>
              </Accordion>
            ))
          ) : (
            <Empty />
          )}
        </Box>
        {toastMessage && (
          <Toast
            status={Boolean(toastMessage)}
            message={toastMessage}
            showToast={toggleToast}
          />
        )}
      </Box>
    );
  } else return <div>{handleError(error).message};</div>;
}
