import LeagueExams from "@src/components/manageDomain/league/leagueExams";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const LeagueExamsEntry = () => {
  return (
    <Wrapper>
      <LeagueExams />
    </Wrapper>
  );
};

export default LeagueExamsEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { id } = context.query;
    const { data } = await request.get({
      url: `/centre/${centre.id}/league/${id}/exams`,
      token,
    });
    return {
      props: {
        pageData: { centre: centre, leagueExamLists: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
