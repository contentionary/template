import Exams from "@src/components/manageDomain/exam";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const ExamPageEntry = () => {
  return (
    <Wrapper>
      <Exams />
    </Wrapper>
  );
};

export default ExamPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { pageId = 1 } = context.query;
    const { data } = await request.get({
      url: context.query.folderId
        ? `/centre/${centre.id}/exams?folderId=${context.query.folderId}&pageId=${pageId}`
        : `/centre/${centre.id}/exams?pageId=${pageId}`,
      token,
    });
    return {
      props: {
        pageData: {
          centre: centre,
          examLists: data,
          folder: data.folder ? data.folder : {},
        },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};