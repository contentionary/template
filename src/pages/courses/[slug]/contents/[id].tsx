import type { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { queryClient } from "@src/pages";

const CourseContents = ({ error, ...pageProps }: BasePageProps) => {
  if (error) return <h1>{error.message}</h1>;
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Contents");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { courseId = 1 } = context.query;
    const centre = await getCentre(context);
    const { data: courseContents } = await request.get(
      `/centre/${centre.id}/course/${courseId}/contents`
    );

    return {
      props: { centre, courseContents },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};

export default CourseContents;
