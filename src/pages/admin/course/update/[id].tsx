import CourseUpdate from "@src/components/manageDomain/course/update";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const CourseUpdatePageEntry = () => {
  return (
    <Container maxWidth="md">
      <CourseUpdate />
    </Container>
  );
};

export default CourseUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/course/${context.query.id}`,
      token,
    });

    return {
      props: {
        pageData: { course: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
