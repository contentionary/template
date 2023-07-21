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
import ErrorPage from "@src/template/views/errorPage";
import MyCourses from "@src/template/views/myCourses";

export const CentreCoursesContext = createContext<CourseListInt | null>(null);

const MyCoursesPage = (pageProps: BasePageProps) => {
  queryClient.setQueryData("pageProps", pageProps);
  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <MyCourses />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1 } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: courseList } = await request.get({
      url: `/my-courses?pageId=${pageId}&centreId=${centre.id}`,
      token,
    });

    return {
      props: { pageData: { courseList }, cachedData: { user, centre, token } },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default MyCoursesPage;
