import { WrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Exam from "./pages/exam";
import Exams from "./pages/exams";
import Courses from "./pages/courses";
import Details from "./pages/details";
import MyExams from "./pages/myExams";
import Contents from "./pages/content";
import MyCourses from "./pages/myCourses";
import ErrorPage from "./pages/errorPage";
import ExamDetails from "./pages/examDetails";
import { ExamAndCoursePages } from "./interface";

const ExamAndCoursePages: Record<ExamAndCoursePages, WrapperFunc> = {
  Home,
  Exam,
  Exams,
  Courses,
  Details,
  MyExams,
  Contents,
  ErrorPage,
  MyCourses,
  ExamDetails,
};

export default ExamAndCoursePages;
