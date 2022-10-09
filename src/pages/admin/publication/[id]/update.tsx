import PublicationUpdate from "@src/components/manageDomain/publication/update";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const PublicationUpdatePageEntry = () => {
  return (
    <Container maxWidth="md">
      <PublicationUpdate />
    </Container>
  );
};

export default PublicationUpdatePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/publication/${context.query.id}`,
      token,
    });
    const { data: categories } = await request.get({
      url: "/publication-categories",
    });

    return {
      props: {
        pageData: { publication: data, publicationCategories: categories },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
