import Box from "@mui/material/Box";
// import dynamic from "next/dynamic";
// import { BasePageProps } from "@src/utils/interface";
// import { queryClient } from "@src/utils";
// import { useRouter } from "next/router";
// import Tabs from "@src/components/shared/tab";
// import MonitorExam from "./monitorExam";
// import PreparatoryExamSettings from "./preparatory";

const ModulesPage = () => {
  // const router = useRouter();
  // const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  // const { id } = router.query;
  // const GeneralSettings = dynamic(() => import("./generalSettings"));
  // const AddQuestion = dynamic(() => import("./section"));

  // const tab = [
  //   "General Settings",
  //   "Add Questions",
  //   "Secure/Monitor Exam",
  //   "Preparatory Mode",
  //   "Exam Result",
  //   "Subscribers",
  //   "Delete Exam",
  // ];
  // const tabPanel = [
  //   <GeneralSettings />,
  //   <AddQuestion centreId={cachedData.centre.id} examId={id as string} />,
  //   <MonitorExam />,
  //   <PreparatoryExamSettings />,
  // ];
  return (
    <Box>
      Exam
      {/* <Tabs tab={tab} tabPanel={tabPanel} /> */}
    </Box>
  );
};

export default ModulesPage;
