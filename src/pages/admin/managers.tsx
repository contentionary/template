import CentreManagers from "@src/components/manageDomain/centreManager";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const CentreManagersEntry = (props: any) => {
  return (
    <Wrapper>
      <CentreManagers
        managers={props.pageData.managers}
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
      url: `/centre/${centre.id}/centre-managers`,
      token,
    });
    return {
      props: {
        pageData: { managers: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
