import { createContext } from "react";
import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps, CourseListInt } from "@src/utils/interface";
import { getAuthData } from "../../utils/auth";
import { queryClient } from "..";

export const CentreCoursesContext = createContext<CourseListInt | null>(null);

const CoursesPage = ({ error, ...pageProps }: BasePageProps) => {
  if (error) {
    return <h1>An error occured {error.message}</h1>;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("List");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { pageId = 1 } = context.query;
    const centre = await getCentre(context);
    const { token, user } = getAuthData(context);
    const { data: courseList } = await request.get(
      `/centre/${centre.id}/courses?pageId=${pageId}`
    );

    return {
      props: { pageData: { courseList }, cachedData: { user, centre, token } },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};
export default CoursesPage;
