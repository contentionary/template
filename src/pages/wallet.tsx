import { createContext } from "react";
// next js
import { GetServerSideProps } from "next";
// utils, styles and interface
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
// template components
import Wallet from "@src/template/views/wallet";
import ErrorPage from "@src/template/views/errorPage";

export const CentreExamContext = createContext<ExamListInt | null>(null);

const WalletPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <Wallet />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { token, user } = getAuthData(context);
  try {
    const { pageId = 1 } = context.query;
    centre = (await getCentre(context)) as CachedCentreInt;

    const { data } = await request.get({
      url: "/wallet/balance",
      token,
    });
    const { data: transactionHistory } = await request.get({
      url: `/wallet/transaction-history?pageId=${pageId}`,
      token,
    });
    return {
      props: {
        pageData: { walletBalance: data, transactionHistory },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default WalletPage;
