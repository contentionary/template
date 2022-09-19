import { createContext } from "react";
import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps, CourseListInt } from "@src/utils/interface";
interface PageProps extends BasePageProps {
  courseList: CourseListInt;
}

export const CentreCoursesContext = createContext<CourseListInt | null>(null);

const CoursesPage = ({ centre, courseList, error }: PageProps) => {
  if (error) {
    return <h1>An error occured {error.message}</h1>;
  }
  const ActiveTheme = themes[centre.theme]("List");

  return (
    <CentreCoursesContext.Provider value={courseList}>
      <ActiveTheme />
    </CentreCoursesContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { pageId = 1 } = context.query;
    const centre = await getCentre(context);
    const { data: courseList } = await request.get(
      `/centre/${centre.id}/courses?pageId=${pageId}`
    );

    return {
      props: { centre, courseList },
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
