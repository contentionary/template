// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import CoursesMenu from "../CoursesMenu";
import CourseListSection from "../CourseListSection";
// interface
import { CoursesPageFunc } from "../interfaceType";

const CoursesLayout: CoursesPageFunc = () => {
  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <Typography
          mb={4}
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          My Courses
        </Typography>
        <Grid
          container
          spacing={2}
          columns={{ xs: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <CoursesMenu />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <CourseListSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoursesLayout;
