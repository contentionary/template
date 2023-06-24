import { WrapperFunc } from "@src/components/Layout/Wrapper/interface";
import Home from "./pages/home";
import Wallet from "./pages/wallet";
import Courses from "./pages/courses";
import Contents from "./pages/content";
import Settings from "./pages/settings";
import { CoursePages } from "./interface";
import ErrorPage from "./pages/errorPage";
import MyCourses from "./pages/myCourses";
import CourseDetails from "./pages/courseDetails";

const coursePages: Record<CoursePages, WrapperFunc> = {
  Home,
  Courses,
  CourseDetails,
  Contents,
  ErrorPage,
  MyCourses,
  Wallet,
  Settings,
};

export default coursePages;
