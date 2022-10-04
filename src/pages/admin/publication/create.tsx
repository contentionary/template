import CreatePublication from "@src/components/manageDomain/publication/createPublication";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const CreatePublicationPageEntry = () => {
  return (
    <Container maxWidth="md">
      <CreatePublication />
    </Container>
  );
};

export default CreatePublicationPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;

    const { data } = await request.get({
      url: "/publication-categories",
    });

    return {
      props: {
        pageData: { publicationCategories: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
