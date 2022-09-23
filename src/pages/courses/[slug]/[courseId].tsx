import type { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/pages";

const CourseDetails = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTheme = themes[pageProps.cachedData.centre.theme]("ErrorPage");

    return <ActiveTheme />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Details");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { user, token } = getAuthData(context);
  try {
    const { courseId = 1 } = context.query;
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: courseDetails } = await request.get({
      url: `/centre/${centre.id}/course/${courseId}`,
      token,
    });

    return {
      props: {
        cachedData: { centre, user, token },
        pageData: { courseDetails },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};

export default CourseDetails;
