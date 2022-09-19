import type { GetServerSideProps } from "next";
import { createContext } from "react";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps, CourseInt } from "@src/utils/interface";

interface PageProps extends BasePageProps {
  courseContents: CourseInt;
}

export const CourseContentsContext = createContext<CourseInt | null>(null);

const CourseContents = ({ centre, courseContents, error }: PageProps) => {
  if (error) return <h1>{error.message}</h1>;
  const ActiveTheme = themes[centre.theme]("Contents");

  return (
    <CourseContentsContext.Provider value={courseContents}>
      <ActiveTheme />
    </CourseContentsContext.Provider>
  );
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
