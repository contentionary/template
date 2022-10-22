import QuestionUpdate from "@src/components/manageDomain/questionBank/update";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const QuestionUpdatePageEntry = () => {
  return (
    <Container maxWidth="md">
      <QuestionUpdate />
    </Container>
  );
};

export default QuestionUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/question-banks/${context.query.id}`,
      token,
    });
    return {
      props: {
        pageData: { questionBank: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
