import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { BasePageProps, QuestionsInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import Tabs from "@src/components/shared/tab";
import Toast from "@src/components/shared/toast";
import { useState } from "react";
import { useToast } from "@src/utils/hooks";

const QuestionPage = () => {
  const Breadcrumbs = dynamic(
    () => import("@src/components/shared/breadcrumbs")
  );
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  const Menu = dynamic(() => import("./questionBankMenu"));
  const GeneralSettings = dynamic(() => import("./listQuestion"));
  const AddQuestion = dynamic(() => import("./addQuestion"));
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { id: questionBankId, centreSlug } = router.query;
  const { toastMessage, toggleToast } = useToast();

  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { questionBank } = pageData as {
    questionBank: {
      name: string;
      description: string;
    };
  };

  const questions = pageData.questions as QuestionsInt[];
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    value
      ? router.replace({
          query: { ...router.query, pageId: value },
        })
      : router.replace({
          query: { ...router.query },
        });
  };

  const links = [
    { link: `/${centreSlug}`, name: "Dashboard" },
    { link: `/${centreSlug}/admin/exam`, name: "Exams" },
    { link: `/${centreSlug}/admin/question-bank`, name: "Question bank" },
  ];
  const tab = ["Questions", "Add Questions"];
  const tabPanel = [
    <GeneralSettings
      key={0}
      questions={questions}
      handleChange={handleChange}
    />,
    <AddQuestion
      centreId={cachedData.centre.id}
      setProgress={setProgress}
      setIsLoading={setIsLoading}
      refetch={handleChange}
      key={1}
    />,
  ];
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Breadcrumbs
        links={links}
        currentPage={{
          name: "Questions",
          link: `/${centreSlug}/admin/question-bank/${questionBankId}/questions`,
        }}
      />

      <Typography
        variant="h5"
        component="div"
        sx={{ mt: 4, textTransform: "uppercase", mb: 1 }}
      >
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
        <Menu
          id={questionBankId as string}
          centreId={cachedData.centre.id}
          centreSlug={centreSlug as string}
        />
      </Box>
      <Tabs
        tab={tab}
        tabPanel={tabPanel}
        sx={{
          background: "rgba(247, 126, 35, 0.1)",
          mt: 4,
        }}
        tabSx={{ width: { md: "100%" }, fontSize: 20 }}
        indicatorColor="primary"
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
      <Loading
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        color="primary"
        size={100}
        value={progress}
      />
    </Container>
  );
};

export default QuestionPage;
