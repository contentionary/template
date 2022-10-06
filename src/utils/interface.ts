/* eslint-disable no-unused-vars */
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
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
  format: string | null;
  isModule: boolean;
  duration?: string;
  pageCount?: string;
}

export interface CourseModuleInt {
  name: string;
  id: string;
  centreId: string;
  moduleId: string | null;
  type: "MODULE" | "CONTENT";
  format: string | null;
  isModule: boolean;
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

export interface CourseInt {
  id: string;
  centreId: string;
  folderId: string | null;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  learnings: string[];
  price: number;
  isPrivate: boolean;
  type: "COURSE" | "FOLDER";
  status: "PUBLISHED" | "PENDING";
  createdAt: Date;
  updatedAt: Date;
  allowSearch: boolean;
  subscriberCount: number;
  contents?: Array<CourseContentInt | CourseModuleInt>;
  duration: string;
}

export interface CourseFolderInt extends CourseInt {
  topContents?: CourseInt[];
}

export interface TemplateDataInt {
  templateDetails: Record<string, any>;
  courses: {
    direct: CourseInt[];
    folders: CourseInt[];
  };
}

export interface CourseListInt {
  courses: Array<CourseInt | CourseFolderInt>;
  totalCount: number;
  pageId: number;
  pageCount: number;
  limit: number;
}

export declare type CourseDetailsPageFunc = (
  courseDetails: CourseInt
) => JSX.Element;

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
  template: string;
  plugins: Record<string, boolean>;
}

export interface PublicationCategoryInt {
  id: string;
  name: string;
}
