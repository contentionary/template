// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// app components
import ExamListSection from "../ExamListSection";
import MyExamsBreadcrumbs from "./MyExamsBreadcrumbs";
// interface
import { queryClient } from "@src/utils";
import { ExamsPageFunc } from "../interfaceType";
import { BasePageProps } from "@src/utils/interface";

const ExamsLayout: ExamsPageFunc = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <Box component="section" sx={{ pt: 4, px: { md: 6 }, pb: 8 }}>
      <Container maxWidth="xl">
        <MyExamsBreadcrumbs />
        <Typography mb={4} variant="h4" component="h2">
          My Exams
        </Typography>
        <ExamListSection pageData={pageData} />
      </Container>
    </Box>
  );
};

export default ExamsLayout;
