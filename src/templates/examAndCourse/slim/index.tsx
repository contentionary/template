import { WrapperFunc } from "@src/components/Layout/Wrapper/interface";
import Home from "./pages/home";
import Exams from "./pages/exams";
import Courses from "./pages/courses";
import CourseDetails from "./pages/courseDetails";
import MyExams from "./pages/myExams";
import Contents from "./pages/content";
import StartExam from "./pages/startExam";
import MyCourses from "./pages/myCourses";
import ErrorPage from "./pages/errorPage";
import ExamDetails from "./pages/examDetails";
import ExamCompleted from "./pages/examCompleted";
import ExamInstructions from "./pages/examInstructions";
import Wallet from "./pages/wallet";
import Settings from "./pages/settings";
import ExamCorrection from "./pages/examCorrection";
import MyResults from "./pages/myResults";
//
import { ExamAndCoursePages } from "./interface";

const ExamAndCoursePages: Record<ExamAndCoursePages, WrapperFunc> = {
  Home,
  Exams,
  Courses,
  CourseDetails,
  MyExams,
  Contents,
  ErrorPage,
  MyCourses,
  StartExam,
  ExamDetails,
  ExamCompleted,
  ExamInstructions,
  Wallet,
  Settings,
  ExamCorrection,
  MyResults,
};

export default ExamAndCoursePages;
