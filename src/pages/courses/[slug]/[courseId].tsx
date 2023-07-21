// next js
import type { GetServerSideProps } from "next";
// utils interface and styles
import { getAuthData } from "@src/utils/auth";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { request, queryClient, getCentre, pageErrorHandler } from "@src/utils";
// template components
import ErrorPage from "@src/template/views/errorPage";
import CourseDetails from "@src/template/views/courseDetails";

const CourseDetailsPage = (pageProps: BasePageProps) => {
  queryClient.setQueryData("pageProps", pageProps);
  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <CourseDetails />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { user, token } = getAuthData(context);
  try {
    const { courseId = 1 } = context.query;
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: courseDetails, auth = null } = await request.get({
      url: `/centre/${centre.id}/course/${courseId}`,
      token,
    });

    return {
      props: {
        cachedData: { centre, user, token },
        pageData: { courseDetails, auth },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};

export default CourseDetailsPage;
