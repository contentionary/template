import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import { BasePageProps } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import Tabs from "@src/components/shared/tab";
import MonitorExam from "./monitorExam";
import PreparatoryExamSettings from "./preparatory";
import Result from "./result";
import Subscribers from "./subscribers";
import DeleteExam from "./deleteExam";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";
import NextLink from "next/link";
import InviteCandidate from "./inviteCandidate";

const ModulesPage = () => {
  const router = useRouter();
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { id } = router.query;
  const { toastMessage, toggleToast } = useToast();
  const GeneralSettings = dynamic(() => import("./generalSettings"));
  const AddQuestion = dynamic(() => import("./section"));
  const tab = [
    "General Settings",
    "Add Questions",
    "Secure/Monitor Exam",
    "Preparatory Mode",
    "Exam Result",
    "Subscribers",
    "Invite Candidates",
    "Delete Exam",
  ];
  const tabPanel = [
    <GeneralSettings toggleToast={toggleToast} key={0} />,
    <AddQuestion
      centreId={cachedData.centre.id}
      examId={id as string}
      toggleToast={toggleToast}
      key={1}
    />,
    <MonitorExam toggleToast={toggleToast} key={2} />,
    <PreparatoryExamSettings toggleToast={toggleToast} key={3} />,
    <Result
      centreId={cachedData.centre.id}
      examId={id as string}
      key={4}
      toggleToast={toggleToast}
    />,
    <Subscribers
      centreId={cachedData.centre.id}
      examId={id as string}
      toggleToast={toggleToast}
      key={5}
    />,
    <InviteCandidate
      centreId={cachedData.centre.id}
      id={id as string}
      toggleToast={toggleToast}
      key={5}
    />,
    <DeleteExam toggleToast={toggleToast} key={6} />,
  ];
  return (
    <Box sx={{ mt: 4 }}>
      <NextLink
        style={{ textDecoration: "none", color: "#dbdbdb" }}
        href={`/exams/${pageData.exam.slug}`}
      >
        <Button sx={{ fontSize: 17 }}>Vew Exam</Button>
      </NextLink>
      <Tabs
        tab={tab}
        tabPanel={tabPanel}
        sx={{
          background: "rgba(247, 126, 35, 0.1)",
          mt: 2,
        }}
        tabSx={{ width: 200, fontSize: 16 }}
        indicatorColor="primary"
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
};

export default ModulesPage;
