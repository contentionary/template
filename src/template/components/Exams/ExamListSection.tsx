import React from "react";
// next components
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
// app components
import Empty from "@src/template/components/shared/state/Empty";
import ExamCard from "@src/template/components/shared/cards/ExamCard";
// styles and interface
import { ExamListInt } from "@src/utils/interface";

const ExamListSection = ({ pageData }: Record<string, any>) => {
  const router = useRouter();
  const exams = pageData.examList as ExamListInt;
  const pageCount = pageData.examList.pageCount as number;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  if (!exams) return <h1>....Loading</h1>;
  else if (exams.exams.length === 0) return <Empty />;
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
      >
        {exams.exams.map((exam, index) => (
          <Grid key={`${index}-exam-card`} item xs={1}>
            <ExamCard exam={exam} />
          </Grid>
        ))}
      </Grid>
      <Stack py={4} direction="row" justifyContent="center" spacing={2}>
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            onChange={handleChange}
            shape="rounded"
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default ExamListSection;
