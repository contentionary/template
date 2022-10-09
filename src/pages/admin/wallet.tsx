import Wallet from "@src/components/wallet";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const WalletPageEntry = () => {
  return (
    <Wrapper>
      <Wallet />
    </Wrapper>
  );
};

export default WalletPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;

    // const { data } = await request.get({
    //   url: `/centre/${centre.id}/publications`,
    //   token,
    // });

    return {
      props: {
        pageData: { centre: centre,  },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
