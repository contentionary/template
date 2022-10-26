interface questionDetails {
  question: string;
}
interface QuestionInt {
  question: questionDetails;
  id: string;
}
export interface SectionInt {
  name: string;
  description: string;
  id: string;
  questions: QuestionInt[];
}
