import CourseSlim from "./course/slim";
import PublicationSlim from "./publication/slim";
import { CoursePages } from "./course/slim/interface";
import { PublicationPages } from "./publication/slim/interface";

const themes: Record<string, Function> = {
  "COURSE:SLIM": (pages: CoursePages) => CourseSlim[pages],
  "PUBLICATION:SLIM": (pages: PublicationPages) => PublicationSlim[pages],
};

export default themes;
