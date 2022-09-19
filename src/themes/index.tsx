import CourseSlim from "./course/slim";
import { CoursePages } from "./course/slim/interface";

const themes: Record<string, Function> = {
  "COURSE:SLIM": (pages: CoursePages) => CourseSlim[pages],
};

export default themes;
