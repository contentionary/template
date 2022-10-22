import CreateExam from "@src/components/manageDomain/exam/createExam";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError } from "@src/utils";
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
    // let publicationCategories = [];
    // if (!context.query.folderId) {
    //   const { data } = await request.get({
    //     url: `/publication-categories`,
    //     token,
    //   });
    //   publicationCategories = data;
    // }
    return {
      props: {
        // pageData: { publicationCategories },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
