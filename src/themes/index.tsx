import CourseSlim from "./course/slim";
import PublicationSlim from "./publication/slim";
import { CoursePages } from "./course/slim/interface";
import { PublicationPages } from "./publication/slim/interface";

const themes: Record<string, Function> = {
  "course-slim": (pages: CoursePages) => CourseSlim[pages],
  "publication-slim": (pages: PublicationPages) => PublicationSlim[pages],
};

export default themes;
