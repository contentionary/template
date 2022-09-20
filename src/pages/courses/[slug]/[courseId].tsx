import type { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/pages";

const CourseDetails = ({ error, ...pageProps }: BasePageProps) => {
  if (error) return <h1>{error.message}</h1>;
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Details");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { courseId = 1 } = context.query;
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
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
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};

export default CourseDetails;
