import AdminPage from "@src/components/manageDomain/dashboard";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const AdminPageEntry = () => {
  return <AdminPage />;
};

export default AdminPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;

    return {
      props: {
        pageData: { centre },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
