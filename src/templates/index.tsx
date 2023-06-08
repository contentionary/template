import CourseSlim from "./course/slim";
import PublicationSlim from "./publication/slim";
import ExamAndLeagueSlim from "./examAndLeague/slim";
import ExamAndCourseSlim from "./examAndCourse/slim";
import ExamAndPublicationSlim from "./examAndPublication/slim";
import CourseExamLeaguePublicationSlim from "./courseExamLeaguePublication/slim";
import { CoursePages } from "./course/slim/interface";
import { PublicationPages } from "./publication/slim/interface";
import { ExamAndCoursePages } from "./examAndCourse/slim/interface";
import { ExamAndLeaguePages } from "./examAndLeague/slim/interface";
import { ExamAndPublicationPages } from "./examAndPublication/slim/interface";
import { CourseExamLeaguePublicationPages } from "./courseExamLeaguePublication/slim/interface";

const themes: Record<string, Function> = {
  course: (pages: CoursePages) => CourseSlim[pages],
  publication: (pages: PublicationPages) => PublicationSlim[pages],
  examAndLeague: (pages: ExamAndLeaguePages) => ExamAndLeagueSlim[pages],
  examAndCourse: (pages: ExamAndCoursePages) => ExamAndCourseSlim[pages],
  examAndPublication: (pages: ExamAndPublicationPages) =>
    ExamAndPublicationSlim[pages],
  courseExamLeaguePublication: (pages: CourseExamLeaguePublicationPages) =>
    CourseExamLeaguePublicationSlim[pages],
  general: (pages: ExamAndCoursePages) => ExamAndCourseSlim[pages],
};

export default themes;
