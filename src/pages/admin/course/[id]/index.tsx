import CourseModules from "@src/components/manageDomain/course/module";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Wrapper from "@src/components/manageDomain";

const CoursePageEntry = () => {
  return (
    <Wrapper>
      <CourseModules />
    </Wrapper>
  );
};

export default CoursePageEntry;
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;

    const { data } = await request.get({
      url: `/centre/${centre.id}/course/${context.query.id}/contents`,
      token,
    });
    return {
      props: {
        pageData: { modules: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
