import AdminPage from "@src/components/manageDomain/dashboard";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CentreProps, CachedCentreInt } from "@src/utils/interface";
import { createContext, useState } from "react";
import { GetServerSideProps } from "next";

interface Props {
  centreData: CentreProps;
}

export const CentreContext = createContext<Array<CentreProps | Function>>([]);

const AdminPageEntry = ({ centreData }: Props) => {
  const [centre, setCentre] = useState<CentreProps>(centreData);
  return (
    <CentreContext.Provider value={[centre, setCentre]}>
      <Wrapper>
        <AdminPage />
      </Wrapper>
    </CentreContext.Provider>
  );
};

export default AdminPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;
    const { data: fullCentre } = await request.get({
      url: `/centre/${centre.id}`,
      token,
    });

    return { props: { centreData: fullCentre } };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
