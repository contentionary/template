import { WrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Exams from "./pages/exams";
import Leagues from "./pages/leagues";
import MyExams from "./pages/myExams";
import Contents from "./pages/content";
import StartExam from "./pages/startExam";
import MyLeagues from "./pages/myLeagues";
import ErrorPage from "./pages/errorPage";
import ExamDetails from "./pages/examDetails";
import LeagueDetails from "./pages/leagueDetails";
import ExamCompleted from "./pages/examCompleted";
import ExamInstructions from "./pages/examInstructions";
import Wallet from "./pages/wallet";
import Settings from "./pages/settings";
import ExamCorrection from "./pages/examCorrection";
import MyResults from "./pages/myResults";
//
import { ExamAndLeaguePages } from "./interface";

const ExamAndLeaguePages: Record<ExamAndLeaguePages, WrapperFunc> = {
  Home,
  Exams,
  Leagues,
  MyExams,
  Contents,
  ErrorPage,
  MyLeagues,
  StartExam,
  ExamDetails,
  LeagueDetails,
  ExamCompleted,
  ExamInstructions,
  Wallet,
  Settings,
  ExamCorrection,
  MyResults,
};

export default ExamAndLeaguePages;
