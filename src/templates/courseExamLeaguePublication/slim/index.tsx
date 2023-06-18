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
import Courses from "./pages/courses";
import CourseDetails from "./pages/courseDetails";
import MyCourses from "./pages/myCourses";
import Settings from "./pages/settings";
import ExamCorrection from "./pages/examCorrection";
import MyResults from "./pages/myResults";
import Library from "./pages/library";
import BookDetails from "./pages/bookDetails";
import Document from "./pages/document";
import MyPublications from "./pages/myPublication";
//
import { CourseExamLeaguePublicationPages } from "./interface";

const CourseExamLeaguePublication: Record<
  CourseExamLeaguePublicationPages,
  WrapperFunc
> = {
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
  Courses,
  CourseDetails,
  MyCourses,
  Wallet,
  Library,
  BookDetails,
  Document,
  MyPublications,
  Settings,
  ExamCorrection,
  MyResults,
};

export default CourseExamLeaguePublication;
