<<<<<<< HEAD
import { CourseInt, PublicationInt, ExamInt } from "@src/utils/interface";
=======
import { CourseInt, PublicationCardProps } from "@src/utils/interface";
>>>>>>> b6a2b21d3fa7157da7b2bbd0c243b526ab650c74

/* eslint-disable no-unused-vars */
export interface CourseCardInt {
  course: CourseInt;
}
export interface PublicationCardInt {}

export declare type CourseCardFunc = (props: CourseCardInt) => JSX.Element;

export declare type PublicationCardFunc = (
  props: PublicationCardProps
) => JSX.Element;

export declare type ExamCardFunc = (props: { exam: ExamInt }) => JSX.Element;
