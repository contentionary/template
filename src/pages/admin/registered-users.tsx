import CentreRegisteredUsers from "@src/components/manageDomain/centreUsers";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const CentreManagersEntry = (props: any) => {
  return (
    <Wrapper>
      <CentreRegisteredUsers
        registeredUsers={props.pageData.registeredUsers}
        centreId={props.cachedData.centre.id}
      />
    </Wrapper>
  );
};

export default CentreManagersEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;

    const { data }: any = await request.get({
      url: `/auth/centre/${centre.id}/registered-users`,
      token,
    });
    return {
      props: {
        pageData: { registeredUsers: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
