/* eslint-disable no-unused-vars */
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
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
  message: string;
}

export interface ErrorResponseInt {
  message: string;
  statusCode: number;
}

export interface RequestInt {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
}

export interface PostRequestInt extends RequestInt {
  data: Record<string, any>;
}

export interface CachedCentreInt {
  id: string;
  name: string;
  logo: string;
  slug: string;
  theme: string;
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
  templateDetails: Record<string, object>;
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
  ownCentres: string[];
  managingCentres: string[];
  subscribedCentres: string[];
  pendingCentres: string[];
  subscribedExams: string[];
  joinedLeagues: string[];
  subscribedCourses: string[];
  subscribedPublications: string[];
}
