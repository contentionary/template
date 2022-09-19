import { WrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import List from "./pages/list";
import Details from "./pages/details";
import Contents from "./pages/content";
import { CoursePages } from "./interface";

const coursePages: Record<CoursePages, WrapperFunc> = {
  Home,
  List,
  Details,
  Contents,
};

export default coursePages;
