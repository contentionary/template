import QuestionBanks from "@src/components/manageDomain/questionBank";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const QuestionBankPageEntry = () => {
  return (
    <Wrapper>
      <QuestionBanks />
    </Wrapper>
  );
};

export default QuestionBankPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;

    const { data } = await request.get({
      url: context.query.folderId
        ? `/centre/${centre.id}/question-banks?folderId=${context.query.folderId}`
        : `/centre/${centre.id}/question-banks`,
      token,
    });
    return {
      props: {
        pageData: { centre: centre, questionBanks: data.questionBanks },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
