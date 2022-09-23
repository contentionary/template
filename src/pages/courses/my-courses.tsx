import { createContext } from "react";
import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  CourseListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "../../utils/auth";
import { queryClient } from "..";

export const CentreCoursesContext = createContext<CourseListInt | null>(null);

const CoursesPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTheme = themes[pageProps.cachedData.centre.theme]("ErrorPage");

    return <ActiveTheme />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("MyCourses");

  return <ActiveTheme />;
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
export default CoursesPage;
