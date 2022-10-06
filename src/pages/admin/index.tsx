import AdminPage from "@src/components/manageDomain/dashboard";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const AdminPageEntry = () => {
  return (
    <Wrapper>
      <AdminPage />
    </Wrapper>
  );
};

export default AdminPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/plugins`,
      token,
    });
    return {
      props: {
        pageData: { plugins: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
