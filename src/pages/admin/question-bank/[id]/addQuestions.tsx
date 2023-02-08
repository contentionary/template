import Questions from "@src/components/manageDomain/exam/manageExam/section/addQuestion";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const QuestionUpdatePageEntry = () => {
  return <Questions />;
};

export default QuestionUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { pageId = 1 } = context.query;
    const { data: questionBankList } = await request.get({
      url: `/centre/${centre.id}/question-banks?pageId=${pageId}`,
      token,
    });
    // const { data } = await request.get({
    //   url: `/centre/${centre.id}/question-bank/${context.query.id}/questions?pageId=${pageId}`,
    //   token,
    // });questions: data.questions,
    return {
      props: {
        pageData: { questionBankList },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
