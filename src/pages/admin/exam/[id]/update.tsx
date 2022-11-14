import ExamUpdate from "@src/components/manageDomain/exam/updateFolder";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const ExamUpdatePageEntry = () => {
  return (
    <Container maxWidth="md">
      <ExamUpdate />
    </Container>
  );
};

export default ExamUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/exam/${context.query.id}`,
      token,
    });
    return {
      props: {
        pageData: { exam: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
