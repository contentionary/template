/* eslint-disable no-unused-vars */
import { ExamInt } from "@src/utils/interface";

export declare type ExamDetailsPageFunc = (props: {
  exam: ExamInt;
  auth: {
    isCentreManager: boolean;
    isPublicationSubscriber: boolean;
    isCentreSubscriber: boolean;
    isExamSubscriber: boolean;
  };
  read: Record<string, any>;
}) => JSX.Element;
