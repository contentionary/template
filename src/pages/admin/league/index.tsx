import Leagues from "@src/components/manageDomain/league";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const LeaguesPageEntry = () => {
  return (
    <Wrapper>
      <Leagues />
    </Wrapper>
  );
};

export default LeaguesPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { pageId = 1 } = context.query;
    const { data } = await request.get({
      url: context.query.folderId
        ? `/centre/${centre.id}/leagues?folderId=${context.query.folderId}&pageId=${pageId}`
        : `/centre/${centre.id}/leagues?pageId=${pageId}`,
      token,
    });
    return {
      props: {
        pageData: { centre: centre, leagueLists: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
