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
    const { pageId = 1 } = context.query;
    const { data } = await request.get({
      url: `/wallet/centre/${centre.id}/balance`,
      token,
    });
    const { data: transactionHistory } = await request.get({
      url: `/wallet/centre/${centre.id}/transaction-history?pageId=${pageId}`,
      token,
    });
    return {
      props: {
        pageData: { walletBalance: data, transactionHistory },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
