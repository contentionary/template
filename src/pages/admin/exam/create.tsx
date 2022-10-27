import CreateExam from "@src/components/manageDomain/exam/createExam";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const CreateCoursePageEntry = () => {
  return (
    <Container maxWidth="md">
      <CreateExam />
    </Container>
  );
};

export default CreateCoursePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    if (context.query.type === "EXAM") {
      const { data: publicCategories } = await request.get({
        url: "/public-categories",
        token,
      });
      return {
        props: {
          pageData: { publicCategories },
          cachedData: { user, centre, token },
        },
      };
    } else
      return {
        props: {
          cachedData: { user, centre, token },
        },
      };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
