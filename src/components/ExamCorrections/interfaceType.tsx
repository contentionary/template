/* eslint-disable no-unused-vars */
import { ExamInt } from "@src/utils/interface";
import { QuestionInt } from "@src/utils/interface";
export interface PinnedQuestionsInt {
  pinnedQuestions: {
    [index: string]: number;
  };
  togglePinQuestion: () => void;
}

export declare type ExamFunc = (props: {
  centerId: string;
  exam: ExamInt;
  auth: {
    isCentreManager: boolean;
    isPublicationSubscriber: boolean;
    isCentreSubscriber: boolean;
  };
}) => JSX.Element;

export interface QuestionsInt {
  id: string;
  questionId: string;
  solution: Record<string, any>;
  question: QuestionInt;
}
