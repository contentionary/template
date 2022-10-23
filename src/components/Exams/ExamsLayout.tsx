// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import ExamsMenu from "./ExamsMenu";
import CourseListSection from "./ExamListSection";
import CourseBreadcrumbs from "./ExamsBreadcrumbs";
// interface
import { queryClient } from "@src/utils";
import { ExamsPageFunc } from "./interfaceType";
import { BasePageProps } from "@src/utils/interface";

const ExamsLayout: ExamsPageFunc = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <CourseBreadcrumbs pageData={pageData} />
        <Grid
          container
          spacing={2}
          columns={{ xs: 1, sm: 3, md: 5, lg: 7, xl: 6 }}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <ExamsMenu pageData={pageData} />
          </Grid>
          <Grid item xs={1} sm={2} md={4} lg={6} xl={5}>
            <Typography mb={4} variant="h4" component="h2">
              {pageData?.examList?.folder?.name || "Explore Exams"}
            </Typography>
            <CourseListSection pageData={pageData} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ExamsLayout;
