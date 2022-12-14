import CentreUsers from "@src/components/manageDomain/centreSubscribers";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const CentreUsersEntry = (props: any) => {
  return (
    <Wrapper>
      <CentreUsers
        subscribers={props.pageData.subscribers}
        centreId={props.cachedData.centre.id}
      />
    </Wrapper>
  );
};

export default CentreUsersEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { data }: any = await request.get({
      url: `/centre/${centre.id}/users?limit=100000`,
      token,
    });
    return {
      props: {
        pageData: { subscribers: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
