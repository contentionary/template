import CreateLeague from "@src/components/manageDomain/league/createLeague";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const CreateLeaguePageEntry = () => {
  return (
    <Container maxWidth="md">
      <CreateLeague />
    </Container>
  );
};
export default CreateLeaguePageEntry;
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    return {
      props: {
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
