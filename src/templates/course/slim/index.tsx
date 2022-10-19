import { WrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Courses from "./pages/courses";
import Details from "./pages/details";
import Contents from "./pages/content";
import MyCourses from "./pages/myCourses";
import ErrorPage from "./pages/errorPage";
import { CoursePages } from "./interface";

const coursePages: Record<CoursePages, WrapperFunc> = {
  Home,
  Courses,
  Details,
  Contents,
  ErrorPage,
  MyCourses,
};

export default coursePages;
