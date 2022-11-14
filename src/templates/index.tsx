import CourseSlim from "./course/slim";
import PublicationSlim from "./publication/slim";
import ExamAndCourseSlim from "./examAndCourse/slim";
import { CoursePages } from "./course/slim/interface";
import { PublicationPages } from "./publication/slim/interface";
import { ExamAndCoursePages } from "./examAndCourse/slim/interface";

const themes: Record<string, Function> = {
  course: (pages: CoursePages) => CourseSlim[pages],
  publication: (pages: PublicationPages) => PublicationSlim[pages],
  examAndCourse: (pages: ExamAndCoursePages) => ExamAndCourseSlim[pages],
  general: (pages: ExamAndCoursePages) => ExamAndCourseSlim[pages],
};

export default themes;
