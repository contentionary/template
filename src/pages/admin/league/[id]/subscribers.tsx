import Wrapper from "@src/components/manageDomain";
import { getCentre, handleError, request } from "@src/utils";
import Candidates from "@src/components/manageDomain/league/candidates";
import Container from "@mui/material/Container";
import ServerSideErrorMessage from "@src/components/shared/state/PageError";
import Box from "@mui/material/Box";
import { getAuthData } from "@src/utils/auth";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

interface Props {
  error: any;
}

const LeagueCandidates = ({ error }: Props): JSX.Element => {
  return (
    <Wrapper>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          {error ? <ServerSideErrorMessage /> : <Candidates />}
        </Container>
      </Box>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const { pageId = 1, limit = 50 } = context.query;
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { data }: any = await request.get({
      url: `/centre/${centre.id}/league/${context.query.id}/candidates?pageId=${pageId}&limit=${limit}`,
      token: token,
    });
    return {
      props: {
        cachedData: { user, centre, token },
        pageData: { candidateList: data },
        user,
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
export default LeagueCandidates;
