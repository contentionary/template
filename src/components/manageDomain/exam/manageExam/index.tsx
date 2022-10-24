import Box from "@mui/material/Box";
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

const ModulesPage = () => {
  const router = useRouter();
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
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
    "Delete Exam",
  ];
  const tabPanel = [
    <GeneralSettings toggleToast={toggleToast} />,
    <AddQuestion
      centreId={cachedData.centre.id}
      examId={id as string}
      toggleToast={toggleToast}
    />,
    <MonitorExam toggleToast={toggleToast} />,
    <PreparatoryExamSettings toggleToast={toggleToast} />,
    <Result centreId={cachedData.centre.id} examId={id as string} />,
    <Subscribers
      centreId={cachedData.centre.id}
      examId={id as string}
      toggleToast={toggleToast}
    />,
    <DeleteExam toggleToast={toggleToast} />,
  ];
  return (
    <Box>
      <Tabs tab={tab} tabPanel={tabPanel} />

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
