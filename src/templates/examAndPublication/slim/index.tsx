import { WrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Exams from "./pages/exams";
import Library from "./pages/library";
import Details from "./pages/details";
import MyExams from "./pages/myExams";
import StartExam from "./pages/startExam";
import MyPublications from "./pages/myPublication";
import ErrorPage from "./pages/errorPage";
import ExamDetails from "./pages/examDetails";
import ExamCompleted from "./pages/examCompleted";
import ExamInstructions from "./pages/examInstructions";
import Wallet from "./pages/wallet";
import Settings from "./pages/settings";
import ExamCorrection from "./pages/examCorrection";
import MyResults from "./pages/myResults";
//
import { ExamAndPublicationPages } from "./interface";

const ExamAndPublicationPages: Record<ExamAndPublicationPages, WrapperFunc> = {
  Home,
  Exams,
  Library,
  Details,
  MyExams,
  ErrorPage,
  MyPublications,
  StartExam,
  ExamDetails,
  ExamCompleted,
  ExamInstructions,
  Wallet,
  Settings,
  ExamCorrection,
  MyResults,
};

export default ExamAndPublicationPages;
