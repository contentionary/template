import type { GetServerSideProps } from "next";
import { createContext } from "react";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps, CourseInt } from "@src/utils/interface";

interface PageProps extends BasePageProps {
  courseDetails: CourseInt;
}

export const CourseDetailsContext = createContext<CourseInt | null>(null);

const CourseDetails = ({ centre, courseDetails, error }: PageProps) => {
  if (error) return <h1>{error.message}</h1>;
  const ActiveTheme = themes[centre.theme]("Details");

  return (
    <CourseDetailsContext.Provider value={courseDetails}>
      <ActiveTheme />
    </CourseDetailsContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { courseId = 1 } = context.query;
    const centre = await getCentre(context);
    const { data: courseDetails } = await request.get(
      `/centre/${centre.id}/course/${courseId}`
    );

    return {
      props: { centre, courseDetails },
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
