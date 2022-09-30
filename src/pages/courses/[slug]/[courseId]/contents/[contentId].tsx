import type { GetServerSideProps } from "next";
import themes from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";

const CourseContents = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      themes[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    themes[pageProps.cachedData.centre.template]("Contents");

  return <ActiveTemplate />;
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
