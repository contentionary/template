import { CourseInt, PublicationInt, ExamInt } from "@src/utils/interface";

/* eslint-disable no-unused-vars */
export interface CourseCardInt {
  course: CourseInt;
}
export interface PublicationCardInt {}

export declare type CourseCardFunc = (props: CourseCardInt) => JSX.Element;

export declare type PublicationCardFunc = (
  props: PublicationInt
) => JSX.Element;

export declare type ExamCardFunc = (props: { exam: ExamInt }) => JSX.Element;
