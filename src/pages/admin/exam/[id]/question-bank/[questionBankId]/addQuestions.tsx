import Questions from "@src/components/manageDomain/exam/manageExam/section/addQuestion";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Wrapper from "@src/components/manageDomain";

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
    const { pageId = 1, questionBankId, id, sectionId = 0 } = context.query;
    const { data: allQuestionList } = await request.get({
      url: `/centre/${centre.id}/question-bank/${questionBankId}/questions?pageId=${pageId}`,
      token,
    });

    const { data: selectedQuestionList } = await request.get({
      url: `/centre/${centre.id}/exam/${id}/questions`,
      token,
    });
     return {
      props: {
        pageData: {
          selectedQuestionList,
          allQuestionList,
        },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
