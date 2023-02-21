import Questions from "@src/components/manageDomain/exam/manageExam/section/questionBank";
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
    const { pageId = 1, folderId } = context.query;
    const { data: questionBankList } = await request.get({
      url: folderId
        ? `/centre/${centre.id}/question-banks?pageId=${pageId}&folderId=${folderId}`
        : `/centre/${centre.id}/question-banks?pageId=${pageId}`,
      token,
    });
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
