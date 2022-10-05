import UpdateDomain from "@src/components/manageDomain/sideNav/updateCentre";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const AdminPageEntry = () => {
  return (
    <Wrapper>
      <UpdateDomain />
    </Wrapper>
  );
};

export default AdminPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data: centreData } = await request.get({
      url: `/centre/${centre.id}`,
      token,
    });

    return {
      props: {
        pageData: { centre: centreData },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
