import Questions from "@src/components/manageDomain/questionBank/questions/updateQuestion";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const QuestionUpdatePageEntry = () => {
  return (
    <Wrapper>
      <Questions />
    </Wrapper>
  );
};

export default QuestionUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { questionId } = context.query;
    const { data } = await request.get({
      url: `/centre/${centre.id}/question-bank/${context.query.id}/question/${questionId}`,
      token,
    });
    console.log(data);
    return {
      props: {
        pageData: { question: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
