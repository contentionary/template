import { ReactNode } from "react";
/* eslint-disable no-unused-vars */
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface QuestionOptionInt {
  id: number;
  value: string;
  isCorrect: boolean;
}
export interface QuestionBankInt {
  name: string;
  description: string;
  id: string;
  type: string;
}

export interface Solution {
  text: JSX.Element;
  image: boolean;
}

export interface QuestionInt {
  type: "theory" | "boolean" | "multichoice" | "objective" | "range";
  max?: number;
  min?: number;
  image?: string;
  question: string;
  answer: ReactNode;
  options: [QuestionOptionInt];
}

export interface QuestionsInt {
  question: QuestionInt;
  solution: Solution;
  id: string;
  questionBankId: string;
  questionId: string;
  mark: number;
  duration: number;
}

export interface PluginsInt {
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
  price: number;
}

export interface ElementProps {
  target: HTMLInputElement;
  preventDefault: Function;
}

export interface ContentInt {
  title: string;
  imageUrl: string;
  description: string;
}

export interface landingPageSectionTwo {
  contents: ContentInt[];
}

export interface TemplateInt {
  landingPageSectionTwo: Record<string, Array<ContentInt>>;
  landingPageSectionOne: {};
}

export interface UserBaseInt {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: number;
  username: string;
}

export interface UserRegistrationInt extends UserBaseInt {
  password: string;
  confirmPassword: string;
}

export interface RequestResponseInt {
  success: boolean;
  data: Record<string, any>;
  auth: Record<string, any>;
  message: string;
}

export interface ErrorResponseInt {
  message: string;
  statusCode: number;
}

export interface RequestInt {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  token?: string;
  headers?: any;
  isRelativeUrl?: boolean;
}

export interface PostRequestInt extends RequestInt {
  data: Record<string, any>;
}

export interface GetRequestInt extends RequestInt {
  data?: Record<string, any>;
}

export interface CachedCentreInt {
  id: string;
  name: string;
  logo: string;
  slug: string;
  template: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  price: number;
  subscriptionModel: "PAY_PER_CONTENT" | "SUBSCRIPTION";
}
export interface BasePageProps {
  error: ErrorResponseInt;
  pageData: Record<string, any>;
  cachedData: {
    user: UserInt;
    token: string;
    centre: CachedCentreInt;
  };
}

export interface CourseContentInt {
  name: string;
  id: string;
  centreId: string;
  moduleId: string | null;
  type: "MODULE" | "CONTENT";
  format: "video" | "audio" | "document";
  isModule: boolean;
  duration?: string;
  pageCount?: string;
  description: string;
  fileUrl: string;
}

export interface CourseModuleInt {
  name: string;
  id: string;
  centreId: string;
  moduleId: string | null;
  type: "MODULE" | "CONTENT";
  format: string | null;
  isModule: boolean;
  description: string;
  contents: Array<CourseContentInt>;
}

export interface AuthorInt {
  id: string;
  imageUrl: string;
  name: string;
}

export interface PublicationChapterInt {
  title: string;
  pageNo: number;
}

export interface PublicationInt {
  id: string;
  centreId: string;
  folderId: string | null;
  name: string;
  slug: string;
  imageUrl: string;
  fileUrl: string;
  description: string;
  learnings: string[];
  price: number;
  isPrivate: boolean;
  type: "PUBLICATION" | "FOLDER";
  status: "PUBLISHED" | "PENDING";
  createdAt: Date;
  updatedAt: Date;
  allowSearch: boolean;
  subscriberCount: number;
  readCount: number;
  folderContentCount: number;
  downloadCount: number;
  publicationCategoryName: string;
  pageCount: string;
  authors?: AuthorInt[];
  allowDownload: boolean;
  allowRead: boolean;
  tags: string[];
  tableOfContents?: PublicationChapterInt[];
  summary: string;
  allowReview: boolean;
  publicationCategoryId: string;
}

export interface PublicationCardProps extends PublicationInt {
  isSubscriptionCentre: boolean;
}

interface CourseContentStats {
  videoCount: number;
  audioCount: number;
  documentCount: number;
}
export interface CourseInt {
  id: string;
  name: string;
  price: number;
  slug: string;
  imageUrl: string;
  previewVideoUrl: string;
  description: string;
  isPrivate: boolean;
  allowSearch: boolean;
  type: "COURSE" | "FOLDER";
  learnings: string[];
  folderId?: string;
  status: "PUBLISHED" | "PENDING";
  createdAt: Date;
  updatedAt: Date;
  centreId?: string;
  subscriberCount: number;
  referralPercentage: number;
  tags?: string[];
  summary: string;
  allowReview: boolean;
  folderContentCount: number;
  contents: CourseModuleInt[];
  courseContentStats: CourseContentStats;
}
export interface ExamInt {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  instruction: string;
  price: number;
  duration: number;
  rating: number;
  status: "ACTIVE" | "DEACTIVATED";
  isSearchable: boolean;
  questionCount: number;
  isPrivate: boolean;
  subscriberCount: number;
  reviewCount: number;
  maxTrialQuestions: number;
  allowCustomDuration: boolean;
  allowCustomQuestionLength: boolean;
  allowReattempt: boolean;
  allowResume: boolean;
  showCorrection: boolean;
  allowTimerPause: boolean;
  randomiseQuestion: boolean;
  randomiseOption: boolean;
  allowReview: boolean;
  maximumAttempt: 2;
  completionMessage: string;
  startDate: Date;
  endDate: Date;
  questionLimit: number;
  totalMark: number;
  createdAt: Date;
  updatedAt: Date;
  type: null | "EXAM" | "FOLDER";
  folderId: string | null;
  centreId: string;
  publicCategoryId: string | null;
  keywords: string;
  centreName: string;
  centreSlug: string;
}

export interface ExamQuestionsInt {
  cache: {
    id: string;
    endAt: Date;
  };
  sections: Array<{
    id: string;
    name: string;
    description: string;
    questions: Array<QuestionsInt>;
  }>;
}

export interface ExamInt {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  price: number;
  duration: number;
  rating: number;
  status: "ACTIVE" | "DEACTIVATED";
  isSearchable: boolean;
  questionCount: number;
  isPrivate: boolean;
  subscriberCount: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  type: null | "EXAM" | "FOLDER";
  folderId: string | null;
  centreId: string;
  publicCategoryId: string | null;
  keywords: string;
  centreName: string;
  centreSlug: string;
}

export interface SubmitAnswerInt {
  score: number;
  examId: string;
  userId: string;
  duration: number;
  maxScore: number;
  sectionScore: [];
  answerId: string;
  hasTheory: boolean;
  theoryQuestionCount: number;
}

export interface ReviewInt {
  id: string;
  userId: string;
  contentId: string;
  comment: string;
  rating: number;
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  surname: string;
  avatar: string;
}

export interface ReviewListInt {
  reviews: Array<ReviewInt>;
  limit: number;
  pageId: number;
  pageCount: number;
  totalCount: number;
}

export interface CourseFolderInt extends CourseInt {
  topContents?: CourseInt[];
}

export interface TemplateDataInt {
  templateDetails: Record<string, any>;
  courses: CourseInt[];
}

export interface CourseListInt {
  courses: Array<CourseInt | CourseFolderInt>;
  totalCount: number;
  pageId: number;
  pageCount: number;
  limit: number;
}

export interface ExamListInt {
  exams: Array<ExamInt>;
  totalCount: number;
  pageId: number;
  pageCount: number;
  limit: number;
}

export declare type CourseDetailsPageFunc = (props: {
  courseDetails: CourseInt;
  action: {
    link: string;
    text: string;
    redirectUrl: string;
  };
  isSubscriber: boolean;
}) => JSX.Element;

export interface UserInt {
  id: string;
  firstname: string;
  surname: string;
  username: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  gender: Gender;
  status: string;
  token: string;
  isAdmin: boolean;
  ownCentres: string[];
  managingCentres: string[];
  subscribedCentres: string[];
  pendingCentres: string[];
  subscribedExams: string[];
  subscribedLeagues: string[];
  subscribedCourses: string[];
  subscribedPublications: string[];
}

export interface CentreProps {
  address: string;
  allowJoinRequest: boolean;
  audioCount: number;
  backgroundImage: string;
  bookCount: number;
  courseContentCount: number;
  createdAt: string;
  customDomain: string;
  customPublicationDomain: string;
  description: string;
  emailAddress: string;
  examCount: number;
  hasCourse: boolean;
  hasExam: boolean;
  hasLeague: boolean;
  hasPublication: boolean;
  hasResult: boolean;
  id: string;
  isPrivate: boolean;
  leagueCount: number;
  logo: string;
  name: string;
  nextPaymentDate: string;
  onlineCourseSubdomain: string;
  phoneNumber: number;
  plan: string;
  price: number;
  publicationCount: number;
  publicationSubdomain: string;
  questionCount: number;
  referralPercentage: number;
  slug: string;
  subscriberCount: number;
  updatedAt: string;
  videoCount: number;
  websiteUrl: string;
  subscriptionModel: "PAY_PER_CONTENT" | "SUBSCRIPTION";
  template: string;
  plugins: Record<string, boolean>;
}

export interface PublicationCategoryInt {
  id: string;
  name: string;
}
