import Courses from "@src/components/manageDomain/course";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const CoursePageEntry = () => {
  return (
    <Wrapper>
      <Courses />
    </Wrapper>
  );
};

export default CoursePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;

    const { data } = await request.get({
      url: context.query.folderId
        ? `/centre/${centre.id}/courses?folderId=${context.query.folderId}`
        : `/centre/${centre.id}/courses`,
      token,
    });

    return {
      props: {
        pageData: { courses: data.courses },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
