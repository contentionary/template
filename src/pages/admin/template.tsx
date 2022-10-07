import ManageWebsite from "@src/components/manageWebsite";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const ManageWebsitePageEntry = () => {
  return (
    <Container maxWidth="md">
      <ManageWebsite />
    </Container>
  );
};

export default ManageWebsitePageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/centre-template`,
      token,
    });

    return {
      props: {
        pageData: { template: data.templateDetails },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
