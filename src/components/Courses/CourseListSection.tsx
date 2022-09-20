// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
// app components
import CourseCard from "@src/components/shared/cards/CourseCard";
// styles and interface
import { CoursesPageFunc } from "./interfaceType";
import { BasePageProps, CourseListInt } from "../../utils/interface";
import { queryClient } from "../../pages";

const CourseListSection: CoursesPageFunc = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const courses = pageData.courseList as CourseListInt;
  if (!courses) return <h1>....Loading</h1>;
  return (
    <>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 2, xl: 4 }}
          columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        >
          {courses.courses.map((course, index) => (
            <Grid key={`${index}-course-card`} item xs={1}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
        <Stack py={4} direction="row" justifyContent="center" spacing={2}>
          <Pagination count={10} shape="rounded" size="large" />
        </Stack>
      </Box>
    </>
  );
};

export default CourseListSection;
