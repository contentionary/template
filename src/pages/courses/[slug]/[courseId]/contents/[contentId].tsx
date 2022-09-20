import type { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { queryClient } from "@src/pages";
import { getAuthData } from "@src/utils/auth";

const CourseContents = ({ error, ...pageProps }: BasePageProps) => {
  if (error) return <h1>{error.message}</h1>;
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Contents");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { courseId, contentId } = context.query;
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
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
    const { message, statusCode } = handleError(err);
    return {
      props: {
        error: { message, statusCode },
      },
    };
  }
};

export default CourseContents;
