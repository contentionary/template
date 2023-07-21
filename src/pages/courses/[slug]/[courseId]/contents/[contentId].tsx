// next js
import type { GetServerSideProps } from "next";
// utils interface and styles
import { getAuthData } from "@src/utils/auth";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { request, queryClient, getCentre, pageErrorHandler } from "@src/utils";
// template components
import Contents from "@src/template/views/content";
import ErrorPage from "@src/template/views/errorPage";

const CourseContents = (pageProps: BasePageProps) => {
  queryClient.setQueryData("pageProps", pageProps);

  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <Contents />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { user, token } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { courseId, contentId } = context.query;
    const [{ data: courseDetails }, { data: courseContent }] =
      await Promise.all([
        request.get({
          url: `/centre/${centre.id}/course/${courseId}`,
          token,
        }),
        request.get({
          url: `/centre/${centre.id}/course/${courseId}/content/${contentId}`,
          token,
        }),
      ]);

    return {
      props: {
        cachedData: { centre, user, token },
        pageData: { courseContent, courseDetails },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};

export default CourseContents;
