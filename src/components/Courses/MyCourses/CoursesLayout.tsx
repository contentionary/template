// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import CourseListSection from "../CourseListSection";
import MyCoursesBreadcrumbs from "./MyCoursesBreadcrumbs";
// interface
import { queryClient } from "@src/utils";
import { CoursesPageFunc } from "../interfaceType";
import { BasePageProps } from "@src/utils/interface";

const CoursesLayout: CoursesPageFunc = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <MyCoursesBreadcrumbs />
        <Typography mb={4} variant="h4" component="h2">
          My Courses
        </Typography>
        <CourseListSection pageData={pageData} />
      </Container>
    </Box>
  );
};

export default CoursesLayout;
