import ExamUpdate from "@src/components/manageDomain/exam/manageExam";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const ExamUpdatePageEntry = () => {
  return (
    <Wrapper>
      <ExamUpdate />
    </Wrapper>
  );
};

export default ExamUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre?.id}/exam/${context.query.id}`,
      token,
    });
    const { data: publicationCategories } = await request.get({
      url: "/public-categories",
      token,
    });
    return {
      props: {
        pageData: { exam: data, publicationCategories },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
