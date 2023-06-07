import LeagueUpdate from "@src/components/manageDomain/league/update";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const LeagueUpdatePageEntry = () => {
  return (
    <Container maxWidth="md">
      <LeagueUpdate />
    </Container>
  );
};
export default LeagueUpdatePageEntry;
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/league/${context.query.id}`,
      token,
    });
    return {
      props: {
        pageData: { league: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
