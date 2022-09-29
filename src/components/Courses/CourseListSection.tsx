import React from "react";
// next components
import { useRouter } from "next/router";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
// app components
import Empty from "@src/components/shared/state/Empty";
import CourseCard from "@src/components/shared/cards/CourseCard";
// styles and interface
import { CourseListInt } from "@src/utils/interface";

const CourseListSection = ({ pageData }: Record<string, any>) => {
  const router = useRouter();
  const courses = pageData.courseList as CourseListInt;
  const pageCount = pageData.courseList.pageCount as number;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };

  if (!courses) return <h1>....Loading</h1>;
  else if (courses.courses.length === 0) return <Empty />;
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 2, xl: 4 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      >
        {courses.courses.map((course, index) => (
          <Grid key={`${index}-course-card`} item xs={1}>
            <CourseCard course={course} />
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

export default CourseListSection;
