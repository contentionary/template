/* eslint-disable no-unused-vars */
import { ExamInt, RequestResponseInt } from "@src/utils/interface";

export declare type ExamFinishedFunc = (props: {
  submitAnsResponse: RequestResponseInt;
  exam: ExamInt;
}) => JSX.Element;
