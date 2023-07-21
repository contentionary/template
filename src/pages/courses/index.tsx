import { createContext } from "react";
// next js
import { GetServerSideProps } from "next";
// utils interface and styles
import {
  BasePageProps,
  CourseListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { request, queryClient, getCentre, pageErrorHandler } from "@src/utils";
// template components
import Courses from "@src/template/views/courses";
import ErrorPage from "@src/template/views/errorPage";

export const CentreCoursesContext = createContext<CourseListInt | null>(null);

const CoursesPage = (pageProps: BasePageProps) => {
  queryClient.setQueryData("pageProps", pageProps);
  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <Courses />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1, folderId = "" } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: courseList } = await request.get({
      url: `/centre/${centre.id}/courses?pageId=${pageId}${
        folderId && `&folderId=${folderId}`
      }`,
      token,
    });
    return {
      props: { pageData: { courseList }, cachedData: { user, centre, token } },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default CoursesPage;
